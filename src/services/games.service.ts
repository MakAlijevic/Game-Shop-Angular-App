import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';
import { Genre } from 'src/models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  public trendingGames = new BehaviorSubject<Game[]>([]);
  public topDealGames = new BehaviorSubject<Game[]>([]);
  public activeGame = new BehaviorSubject<Game[]>([]);
  public featuredConsoles = new BehaviorSubject<Game[]>([]);
  public searchGames = new BehaviorSubject<Game[]>([]);
  public searchGenres = new BehaviorSubject<Genre[]>([]);
  public allGenres = new BehaviorSubject<Genre[]>([]);
  public activeGenre = new BehaviorSubject<string>("All");


  public searchParam: string = "";
  public searchParamGenres: string = "";
  public allGames: Game[] = [];


  activeConsole: string = "All";
  activeYear!: number;
  activeRating!: number;

  constructor(private http: HttpClient) {
  }

  getAllGames() {
    return this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      this.allGames = result;
    });
  }

  getTrendingGames() {
    var trendingGames: Game[] = [];
    var counter = 0;
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length && counter < 6; i++) {
        if (result[i].trending === true) {
          trendingGames.push(result[i]);
          counter++;
        }
      }
    });
    this.trendingGames.next(trendingGames);
  }

  getTopDealGames() {
    var topDealGames: Game[] = [];
    var counter = 0;
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length && counter < 3; i++) {
        if (result[i].sale !== undefined && result[i].sale > 0) {
          topDealGames.push(result[i]);
          counter++;
        }
      }
    });
    this.topDealGames.next(topDealGames);
  }

  getActiveGame(id: number) {
    var activeGame: Game[] = [];
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].game_id === id) {
          activeGame.push(result[i]);
        }
      }
    });
    this.activeGame.next(activeGame);
  }

  getFeaturedConsoles() {
    var featuredConsoles: Game[] = [];
    var counter = 0;
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length && counter < 4; i++) {
        if (result[i].console_featured === true && result[i].is_console === true) {
          featuredConsoles.push(result[i]);
          counter++;
        }
      }
    });
    this.featuredConsoles.next(featuredConsoles);
  }

  triggerSearchGames() {
    this.getSearchGames(this.searchParam);
  }

  getSearchGames(searchParam: string) {
    var searchGames: Game[] = [];
    var counter = 0;
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length && counter < 15; i++) {
        if (result[i].is_console !== true) {
          if (this.activeGenre.getValue() !== "All" && !this.hasGenre(result[i], this.activeGenre.getValue())) {
            continue; // Skip this game if it doesn't match the active genre
          }

          if (this.activeGenre.getValue() !== "All" && !this.gameMatchesSearchParam(result[i], searchParam)) {
            continue; // Skip this game if it doesn't match the search parameter and active genre
          }

          if (result[i].title.toLowerCase().includes(searchParam.toLowerCase()) || this.checkAlternateTitles(searchParam, result[i])) {
            searchGames.push(result[i]);
            counter++;
          }
        }
      }
      this.searchGames.next(searchGames);
    });
  }

  gameMatchesSearchParam(game: Game, searchParam: string): boolean {
    if (!game.genres) {
      return false;
    }
    for (var i = 0; i < game.genres.length; i++) {
      if (game.genres[i].genre_name === this.activeGenre.getValue() && game.title.toLowerCase().includes(searchParam.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  hasGenre(game: Game, genreName: string): boolean {
    for (var i = 0; i < game.genres.length; i++) {
      if (game.genres[i].genre_name === genreName) {
        return true;
      }
    }
    return false;
  }

  showMoreSearchGames() {
    const expandedSearchGames = this.searchGames.getValue();
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      const newGames = result.filter(game => {
        if (this.activeGenre.getValue() !== "All" && !this.hasGenre(game, this.activeGenre.getValue())) {
          return false; // Skip this game if it doesn't match the active genre
        }
        return (
          !expandedSearchGames.some(existingGame => existingGame.game_id === game.game_id) &&
          !game.is_console &&
          (this.searchParam === "" ||
            (game.title.toLowerCase().includes(this.searchParam.toLowerCase()) ||
              this.checkAlternateTitles(this.searchParam, game)))
        );
      });
      this.searchGames.next([...this.searchGames.getValue(), ...newGames.slice(0, 15)]);
    });
  }

  checkAlternateTitles(searchParam: string, game: Game) {
    for (var alternateTitle of game.alternate_titles) {
      if (alternateTitle.title.toLowerCase().includes(searchParam.toLowerCase())) {
        if (this.activeGenre.getValue() === "All" || this.hasGenre(game, this.activeGenre.getValue())) {
          return true;
        }
      }
    }
    return false;
  }

  getAllGenres() {
    var searchGenres: Genre[] = [];
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].genres.length; j++) {
          if (result[i].is_console !== true) {
            var genre = result[i].genres[j];
            var exists = searchGenres.some((g) => g.genre_name === genre.genre_name);
            if (!exists) {
              searchGenres.push(result[i].genres[j]);
            }
          }
        }
      }
      searchGenres.sort((a, b) => a.genre_name.localeCompare(b.genre_name));
      this.allGenres.next(searchGenres);
    });
  }

  getSearchGenres(searchParam: string) {
    var searchGenres: Genre[] = [];
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].genres.length; j++) {
          if (result[i].is_console !== true) {
            if (result[i].genres[j].genre_name.toLowerCase().includes(searchParam.toLowerCase())) {
              var genre = result[i].genres[j];
              var exists = searchGenres.some((g) => g.genre_name === genre.genre_name);
              if (!exists) {
                searchGenres.push(result[i].genres[j]);
              }
            }
          }
        }
      }
      searchGenres.sort((a, b) => a.genre_name.localeCompare(b.genre_name));
      this.searchGenres.next(searchGenres.slice(0, 15));
    });
  }

  showMoreSearchGenres() {
    const expandedSearchGenres = this.searchGenres.getValue();
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      const newGenres: Genre[] = [];
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].genres.length; j++) {
          if (!result[i].is_console) {
            const genre = result[i].genres[j];
            if (genre.genre_name.toLowerCase().includes(this.searchParamGenres.toLowerCase())) {
              const exists = expandedSearchGenres.some((g) => g.genre_name === genre.genre_name) || newGenres.some((g) => g.genre_name === genre.genre_name);
              if (!exists) {
                newGenres.push(genre);
              }
            }
          }
        }
      }
      newGenres.sort((a, b) => a.genre_name.localeCompare(b.genre_name));
      this.searchGenres.next([...expandedSearchGenres, ...newGenres.slice(0, 15)]);
    });
  }
}


