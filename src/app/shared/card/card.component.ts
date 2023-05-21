import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() title: string = "";
  @Input() price: number = 0.0;
  @Input() image: string = "";
  @Input() sale?: number;
  @Input() id: number = 1;

  getImageUrl() {
    return "url(" + this.image + ")";
  }
}
