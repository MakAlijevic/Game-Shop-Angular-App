import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item-model';
import { UserService } from 'src/services/user.service';
import { Purchase } from 'src/models/purchase-model';
import { PurchaseCard } from 'src/models/purchase-card.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  username: string = localStorage.getItem("username") || "User";
  joined: string = localStorage.getItem("joined") || "unknown";
  purchasedGames: PurchaseCard[] = [];

  constructor(private gamesService: GamesService, private router: Router, private userService: UserService) {
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
      var purchaseCard: PurchaseCard = {
        game: purchasedItems[i].games[i].game,
        date: purchasedItems[i].date,
        totalPrice: purchasedItems[i].totalPrice
      };
      this.purchasedGames.push(purchaseCard);
      }
    }

  logout() {
    localStorage.clear();
    this.userService.logout();
    this.router.navigate(['/mainpage']);
  }
}