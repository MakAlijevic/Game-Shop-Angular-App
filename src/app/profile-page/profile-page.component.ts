import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item-model';
import { UserService } from 'src/services/user.service';
import { Purchase } from 'src/models/purchase-model';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  username: string = localStorage.getItem("username") || "User";
  joined: string = localStorage.getItem("joined") || "unknown";
  purchasedGames: Purchase[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getPurchasedGames();
  }

  getPurchasedGames() {
    var purchasedItems: Purchase[] = [];
    this.userService.purchased.subscribe(result => {
       purchasedItems = result;
    });

    for (var i = 0; i < purchasedItems.length; i++) {
      this.purchasedGames.push(purchasedItems[i]);
      }
    }

  logout() {
    localStorage.clear();
    this.userService.logout();
    this.router.navigate(['/mainpage']);
  }
}