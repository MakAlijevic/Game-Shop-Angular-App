import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  cart: CartItem[] = [];
  selected: number[] = []

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.cart.subscribe(result => {
      this.cart = result;
    })
    this.userService.selectedCartItemsIds.subscribe(result => {
      this.selected = result;
    })
  }

  changeQuantity(itemId: number, event: Event) {
    var quantity = parseInt((event.target as HTMLInputElement).value);
    this.userService.updateQuantity(itemId, quantity);
  }

  setSelectedItemId(itemId: number) {
    if (this.selected.includes(itemId)) {
      this.userService.selectedCartItemsIds.next(this.selected.filter(x => x !== itemId));
    }
    else {
      this.selected.push(itemId);
      this.userService.selectedCartItemsIds.next(this.selected);
    }
    this.generateCheckout();
  }

  generateCheckout() {
    this.userService.generateCheckout();
  }

}
