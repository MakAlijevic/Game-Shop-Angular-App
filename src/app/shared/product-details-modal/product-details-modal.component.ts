import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.model';
import { GamesService } from 'src/services/games.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent implements OnInit {

  activeGame: Game[] = [];
  isLoggedIn: boolean = false;

  constructor(private gamesService: GamesService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.gamesService.activeGame.subscribe(result => {
      this.activeGame = result;
    })
    this.userService.isLoggedIn.subscribe(result => {
      this.isLoggedIn = result;
    })
  }

  getImageUrl() {
    if (this.activeGame.length > 0 && this.activeGame[0].sample_cover) {
      return "url(" + this.activeGame[0].sample_cover.image + ")";
    }
    return undefined;
  }

  addItemToCart(gameId: number) {
    this.userService.addItemToCart(gameId);
  }
}
