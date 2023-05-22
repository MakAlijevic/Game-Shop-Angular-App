import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent implements OnInit {

  checkoutItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.checkoutItems.subscribe(result => {
      this.checkoutItems = result;
    });
    this.userService.totalPrice.subscribe(result => {
      this.totalPrice = result;
    });
  }

  clearCartAfterCheckout() {
    this.userService.clearCartAfterCheckout();
  }

}
