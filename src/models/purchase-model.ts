import { CartItem } from "./cart-item-model";

export class Purchase {
    public games: CartItem[];
    public quantity: number;
    public date: string;
    public totalPrice: number;

    constructor(games: CartItem[], quantity: number, date: string, totalPrice: number) {
        this.games = games;
        this.quantity = quantity;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}