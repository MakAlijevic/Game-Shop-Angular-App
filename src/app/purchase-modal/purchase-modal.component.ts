import { Component } from '@angular/core';
import { CartItem } from 'src/models/cart-item-model';
import { Purchase } from 'src/models/purchase-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {
  activePurchase: Purchase[] =[];

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.userService.activePurchase.subscribe(result => {
      this.activePurchase = result;
    })
  }
}