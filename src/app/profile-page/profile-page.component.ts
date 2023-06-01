import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  username: string = localStorage.getItem("username") || "User";
  joined: string = localStorage.getItem("joined") || "unknown";
  trendingGames: Game[] = [];

  constructor(private gamesService: GamesService, private router: Router) {
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/mainpage']);
  }
}