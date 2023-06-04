import { CartItem } from "./cart-item-model";

export class Purchase {
    private static nextId: number = 0;
    
    public id: number;
    public games: CartItem[];
    public quantity: number;
    public date: string;
    public totalPrice: number;

    constructor(games: CartItem[], quantity: number, date: string, totalPrice: number) {
        this.id = Purchase.nextId;
        Purchase.nextId++; 

        this.games = games;
        this.quantity = quantity;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}