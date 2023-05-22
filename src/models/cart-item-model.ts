import { Game } from "./game.model";

export class CartItem {
    public game: Game;
    public quantity: number;

    constructor(game: Game, quantity: number) {
        this.game = game;
        this.quantity = quantity;
    }
}