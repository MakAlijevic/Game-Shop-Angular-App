import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Genre } from 'src/models/genre.model';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchGames: Game[] = [];
  allGenres: Genre[] = [];
  allConsoles: Game[] = []

  activeGenre: string = "All";
  activeConsole: string = "All";
  activeYear: string = "All";
  activeRating: string = "All";

  constructor(private gamesService: GamesService) {

  }
  ngOnInit(): void {
    this.gamesService.getAllGenres();
    this.gamesService.getFeaturedConsoles();
    this.gamesService.searchGames.subscribe(result => {
      this.searchGames = result;
    })
    this.gamesService.allGenres.subscribe(result => {
      this.allGenres = result;
    })
    this.gamesService.featuredConsoles.subscribe(result => {
      this.allConsoles = result;
    })
    this.gamesService.activeGenre.subscribe(result => {
      this.activeGenre = result;
    })
  }

  getActiveGame(id: number) {
    this.gamesService.getActiveGame(id);
  }

  showMoreSearchGames() {
    this.gamesService.showMoreSearchGames();
  }

  setActiveGenre(activeGenre: string) {
    this.gamesService.activeGenre.next(activeGenre);
    this.gamesService.triggerSearchGames();
  }

  setActiveConsole(activeConsole: string) {
    this.activeConsole = activeConsole;
  }

  setActiveYear(activeYear: string) {
    this.activeYear = activeYear;
  }

  setActiveRating(activeRating: string) {
    this.activeRating = activeRating;
  }
}
