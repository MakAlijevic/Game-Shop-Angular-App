import { Game } from "./game.model";

export class PurchaseCard {
    public game: Game;
    public date: string;
    public totalPrice: number;

    constructor(game: Game, quantity: number, date: string, totalPrice: number) {
        this.game = game;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}