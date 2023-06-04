import { Component, Input } from '@angular/core';
import { Purchase } from 'src/models/purchase-model';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent {

  @Input() item: Purchase | undefined;

  getImageUrl() {
    return "url(" + this.item?.games[0].game.sample_cover.image + ")";
  }

}
