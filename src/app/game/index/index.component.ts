import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  games?: Game[];
  ip_address: String = "";


  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getAll().subscribe(data => {
      this.games = data;
      console.log(this.games);
    });
  }

  showGame(id: number) {
    this.gameService.find(id).subscribe(data => {
      console.log(data);
    });
  }

  likeGame(id: number) {
    //need to pass the ip address
    this.ip_address = "123.12.132";
    this.gameService.update(id, this.ip_address).subscribe(data => {
      console.log(data);
    });
  }
}
