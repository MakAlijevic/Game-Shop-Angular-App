import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game.model';
import { PurchaseCard } from 'src/models/purchase-card.model';
import { Purchase } from 'src/models/purchase-model';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent {

  
  @Input() item: PurchaseCard | undefined;

  getImageUrl() {
    return "url(" + this.item?.game.sample_cover.image + ")";
  }

}
