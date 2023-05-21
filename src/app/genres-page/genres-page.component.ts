import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/models/genre.model';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css']
})
export class GenresPageComponent implements OnInit {

  searchGenres: Genre[] = [];
  searchParam: string = "";

  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gamesService.searchGenres.subscribe(result => {
      this.searchGenres = result;
    })
  }

  getSearchGenres() {
    this.gamesService.getSearchGenres(this.searchParam);
    this.gamesService.searchParamGenres = this.searchParam;
  }

  showMoreSearchGenres() {
    this.gamesService.showMoreSearchGenres();
  }

  searchGamesByGenre(genreName: string) {
    this.gamesService.activeGenre.next(genreName);
    this.gamesService.getSearchGames("");
  }

}
