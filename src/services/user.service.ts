import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CartItem } from 'src/models/cart-item-model';
import { GamesService } from './games.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user.model';
import { Purchase } from 'src/models/purchase-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: User[] = [];
  public cart = new BehaviorSubject<CartItem[]>([]);
  public purchased = new BehaviorSubject<Purchase[]>([]);
  public activePurchase = new BehaviorSubject<Purchase[]>([]);
  public selectedCartItemsIds = new BehaviorSubject<number[]>([]);
  public checkoutItems = new BehaviorSubject<CartItem[]>([]);
  public totalPrice = new BehaviorSubject<number>(0);
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private gamesService: GamesService, private http: HttpClient) { }

  register(username: string, email: string, password: string, confirmPassword: string) {
    const newUser: User = {
      username,
      email,
      password,
      joined: new Date()
    };
    this.users.push(newUser); 
  }

  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username);
  
    if (user) {
      if (user.password === password) {
        this.isLoggedIn.next(true);
        const formattedDate: string = user.joined.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        localStorage.setItem("username", user.username);
        localStorage.setItem("joined", formattedDate);
      } else {
        console.log("Wrong password");
      }
    } else {
      console.log("User not found");
    }
  }

  logout() {
    localStorage.clear();
    this.purchased.next([]);
    this.isLoggedIn.next(false);
  }

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

  getPurchasedItems() {
    var totalPrice: number = 0;
    var purchase: Purchase = new Purchase([], 0, '', 0);
    var date = new Date();
    const items = this.checkoutItems.getValue();
    for (var i = 0; i < items.length; i++) {
      totalPrice = totalPrice + (items[i].game.moby_score * items[i].quantity);
      purchase.games.push(items[i]);
    }
    const formattedDate: string = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    purchase.date = formattedDate;
    purchase.totalPrice = totalPrice;
    this.purchased.next([...this.purchased.getValue(), purchase]);
  }

  clearCartAfterCheckout() {
    var selectedItemIds = this.selectedCartItemsIds.getValue();
    var currentCart = this.cart.getValue();

    const updatedCart = currentCart.filter(cartItem => !selectedItemIds.includes(cartItem.game.game_id));

    this.cart.next(updatedCart);
    this.selectedCartItemsIds.next([]);
    this.totalPrice.next(0);
  }

  getActivePurchase(id: number) {
    var purchase: Purchase[] = [];
      for (var i = 0; i < this.purchased.getValue().length; i++) {
        if (this.purchased.getValue()[i].id == id) {
          purchase.push(this.purchased.getValue()[i]);
        }
      }
    this.activePurchase.next(purchase);
  }
}
