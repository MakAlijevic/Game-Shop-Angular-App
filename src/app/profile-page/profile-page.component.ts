import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  trendingGames: Game[] = [];

  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gamesService.getTrendingGames();
    this.gamesService.trendingGames.subscribe(result => {
    this.trendingGames = result;
    })
  }

  getActiveGame(id: number) {
    this.gamesService.getActiveGame(id);
  }
}