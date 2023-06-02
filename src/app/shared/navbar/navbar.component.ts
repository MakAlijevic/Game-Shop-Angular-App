import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/services/games.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public searchParam: string = "";
  isLoggedIn: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private userService: UserService) {
  }

  
  ngOnInit(): void {
    this.gamesService.getSearchGames("");
    this.gamesService.getSearchGenres("");
    this.userService.isLoggedIn.subscribe(result => {
      this.isLoggedIn = result;
    })

  }

  searchGames() {
    this.gamesService.getSearchGames(this.searchParam);
    this.gamesService.searchParam = this.searchParam;
    this.router.navigate(['/search']);
  }
  
}

