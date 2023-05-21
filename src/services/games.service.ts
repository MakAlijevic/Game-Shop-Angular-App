import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  public trendingGames = new BehaviorSubject<Game[]>([]);
  public topDealGames = new BehaviorSubject<Game[]>([]);
  public activeGame = new BehaviorSubject<Game[]>([]);
  public featuredConsoles = new BehaviorSubject<Game[]>([]);
  public searchGames = new BehaviorSubject<Game[]>([]);
  public allGames: Game[] = [];

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

  getSearchGames(searchParam: string) {
    var searchGames: Game[] = [];
    this.http.get<Game[]>("/assets/Games.json").subscribe(result => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].is_console !== true) {
          if (result[i].title.toLowerCase().includes(searchParam.toLowerCase()) || this.checkAlternateTitles(searchParam, result[i])) {
            searchGames.push(result[i]);
          }
        }
      }
    });
    this.searchGames.next(searchGames);
  }

  checkAlternateTitles(searchParam: string, game: Game) {
    for (var alternateTitle of game.alternate_titles) {
      if (alternateTitle.title.toLowerCase().includes(searchParam.toLowerCase())) {
        return true
      }
    }
    return false;
  }
}


