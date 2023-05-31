import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CartItem } from 'src/models/cart-item-model';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cart = new BehaviorSubject<CartItem[]>([]);
  public purchased = new BehaviorSubject<CartItem[]>([]);
  public selectedCartItemsIds = new BehaviorSubject<number[]>([]);
  public checkoutItems = new BehaviorSubject<CartItem[]>([]);
  public totalPrice = new BehaviorSubject<number>(0);

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
  }

  generateCheckout() {
    var cart = this.cart.getValue();
    var selectedItemIds = this.selectedCartItemsIds.getValue();
    var selectedItems: CartItem[] = [];
    let totalPrice = 0;
    var requests = selectedItemIds.map(itemId => this.gamesService.getGameById(itemId));

    forkJoin(requests).subscribe(games => {
      games.forEach((game, index) => {
        if (game) {
          var quantity = cart.find(cartItem => cartItem.game.game_id === selectedItemIds[index])?.quantity;
          var cartItem = new CartItem(game, quantity!);
          totalPrice = totalPrice + (game.moby_score * quantity!);
          selectedItems.push(cartItem);
          this.totalPrice.next(Number(totalPrice.toFixed(2)));
        }
      });
    });
    if (selectedItemIds.length === 0) {
      this.totalPrice.next(0);
    }
    this.checkoutItems.next(selectedItems);
  }

  purchasedItems() {
    var checkoutItems = this.checkoutItems.getValue();
    var selectedItemIds = this.selectedCartItemsIds.getValue();
    var selectedItems: CartItem[] = [];
    let totalPrice = 0;
    var requests = selectedItemIds.map(itemId => this.gamesService.getGameById(itemId));

    forkJoin(requests).subscribe(games => {
      games.forEach((game, index) => {
        if (game) {
          var quantity = checkoutItems.find(checkoutItem => checkoutItem.game.game_id === selectedItemIds[index])?.quantity;
          var checkoutItem = new CartItem(game, quantity!);
          totalPrice = totalPrice + (game.moby_score * quantity!);
          selectedItems.push(checkoutItem);
          this.totalPrice.next(Number(totalPrice.toFixed(2)));
        }
      });
    });
    if (selectedItemIds.length === 0) {
      this.totalPrice.next(0);
    }
    this.purchased.next(selectedItems);
  }

  clearCartAfterCheckout() {
    var selectedItemIds = this.selectedCartItemsIds.getValue();
    var currentCart = this.cart.getValue();

    const updatedCart = currentCart.filter(cartItem => !selectedItemIds.includes(cartItem.game.game_id));

    this.cart.next(updatedCart);
    this.selectedCartItemsIds.next([]);
    this.totalPrice.next(0);
  }
}
