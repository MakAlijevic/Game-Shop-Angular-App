import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  /* @Input() title: string = "";
  @Input() price: number = 0.0;
  @Input() image: string = "";
  @Input() sale?: number;
  @Input() id: number = 1; */

  @Input() item: Game | undefined;

  getImageUrl() {
    return "url(" + this.item?.sample_cover.image + ")";
  }
}
