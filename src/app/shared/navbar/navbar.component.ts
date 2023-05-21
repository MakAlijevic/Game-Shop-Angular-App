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

  constructor(private gamesService: GamesService, private router: Router) {
  }
  ngOnInit(): void {
    this.gamesService.getSearchGames("");
    this.gamesService.getSearchGenres("");
  }

  searchGames() {
    this.gamesService.getSearchGames(this.searchParam);
    this.gamesService.searchParam = this.searchParam;
    this.router.navigate(['/search']);
  }

}
