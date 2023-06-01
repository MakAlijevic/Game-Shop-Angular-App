import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public searchParam: string = "";
  isLoggedIn: boolean = false;

  constructor(private gamesService: GamesService, private router: Router) {
  }

  
  ngOnInit(): void {
    this.gamesService.getSearchGames("");
    this.gamesService.getSearchGenres("");
    this.isLoggedIn = localStorage.getItem('username') !== null;

  }

  searchGames() {
    this.gamesService.getSearchGames(this.searchParam);
    this.gamesService.searchParam = this.searchParam;
    this.router.navigate(['/search']);
  }
  
}

