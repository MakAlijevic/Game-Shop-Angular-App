import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  trendingGames: Game[] = [];
  topDealGames: Game[] = [];
  featuredConsoles: Game[] = [];

  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gamesService.getTrendingGames();
    this.gamesService.getTopDealGames();
    this.gamesService.getFeaturedConsoles();
    this.gamesService.trendingGames.subscribe(result => {
      this.trendingGames = result;
    })
    this.gamesService.topDealGames.subscribe(result => {
      this.topDealGames = result;
    })
    this.gamesService.featuredConsoles.subscribe(result => {
      this.featuredConsoles = result;

    })
  }

  getActiveGame(id: number) {
    this.gamesService.getActiveGame(id);
  }

  searchGamesByGenre(genreName: string) {
    this.gamesService.activeGenre.next(genreName);
    this.gamesService.getSearchGames("");
  }
}
