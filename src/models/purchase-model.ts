import { Game } from "./game.model";

export class Purchase {
    public game: Game;
    public quantity: number;
    public date: Date;

    constructor(game: Game, quantity: number, date: Date) {
        this.game = game;
        this.quantity = quantity;
        this.date = date;
    }
}