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

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.cart.subscribe(result => {
      this.cart = result;
    })
  }

  changeQuantity(gameId: number, event: Event) {
    var quantity = parseInt((event.target as HTMLInputElement).value);
    this.userService.updateQuantity(gameId, quantity);
  }

}
