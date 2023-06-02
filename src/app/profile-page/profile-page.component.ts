import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  username: string = localStorage.getItem("username") || "User";
  joined: string = localStorage.getItem("joined") || "unknown";
  trendingGames: Game[] = [];

  constructor(private gamesService: GamesService, private router: Router, private userService: UserService) {
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
    this.userService.logout();
    this.router.navigate(['/mainpage']);
  }
}