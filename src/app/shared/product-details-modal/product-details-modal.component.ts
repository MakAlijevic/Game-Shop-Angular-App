import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.model';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent implements OnInit {

  activeGame: Game[] = [];

  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gamesService.activeGame.subscribe(result => {
      this.activeGame = result;
    })
  }

  getImageUrl() {
    if (this.activeGame.length > 0 && this.activeGame[0].sample_cover) {
      return "url(" + this.activeGame[0].sample_cover.image + ")";
    }
    return undefined;
  }
}
