import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/models/cart-item-model';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cart = new BehaviorSubject<CartItem[]>([]);

  constructor(private gamesService: GamesService) { }

  addItemToCart(gameId: number) {
    var currentCart = this.cart.getValue();
    var itemInCart = currentCart.find(cartItem => cartItem.game.game_id === gameId)
    if (itemInCart !== undefined) {
      this.updateQuantity(gameId, itemInCart.quantity + 1);
    } else {
      this.gamesService.getGameById(gameId).subscribe(game => {
        if (game) {
          const cartItem = new CartItem(game, 1);
          const currentCart = this.cart.getValue();
          const updatedCart = [...currentCart, cartItem];
          this.cart.next(updatedCart);
        }
      });
    }
  }

  updateQuantity(gameId: number, quantity: number) {
    var currentCart = this.cart.getValue();
    const updatedCart = currentCart.map(cartItem => {
      if (cartItem.game.game_id === gameId) {
        return new CartItem(cartItem.game, quantity);
      }
      return cartItem;
    });
    this.cart.next(updatedCart);
    console.log(this.cart.getValue());
  }
}
