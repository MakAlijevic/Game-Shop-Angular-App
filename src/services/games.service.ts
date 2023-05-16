import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  public allGames = new BehaviorSubject<Game[]>([]);

  constructor(private http: HttpClient) {

  }

  getAllGames() {
    return this.http.get<Game[]>("http://localhost:4200/assets/Games.json").subscribe(result => {
      this.allGames.next(result);
    })
  }
}


