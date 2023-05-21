import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.model';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchGames: Game[] = [];

  constructor(private gamesService: GamesService) {

  }
  ngOnInit(): void {
    this.gamesService.searchGames.subscribe(result => {
      this.searchGames = result;
    })
  }

  getActiveGame(id: number) {
    this.gamesService.getActiveGame(id);
  }
}
