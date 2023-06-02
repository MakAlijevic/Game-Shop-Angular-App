import { Component } from '@angular/core';
import { CartItem } from 'src/models/cart-item-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {
  purchasedItems: CartItem[] = [];
  totalPriceOfPurchased: number = 0;

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    
    this.userService.purchased.subscribe(result => {
      this.purchasedItems = result;
    });
    this.userService.totalPriceOfPurchased.subscribe(result => {
      this.totalPriceOfPurchased = result;
    });
  }

}
