import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  games?: Game[];
  game?: Game;
  display_show = false;
  ip_address: String = "";
  selected_id: number = 0;
  game_likes: String = "";
  image_path: any;


  constructor(public gameService: GameService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.gameService.getAll().subscribe(data => {
      this.games = data;
    });
  }

  showGame(id: number) {
    this.gameService.find(id).subscribe(data => {
      console.log(data)
      this.display_show = true;
      this.game = data.game;
      this.game_likes = data.likes;
      this.selected_id = data.game.id;
      this.image_path = 'data:image/png;base64, ' + data.image ;
    });
  }

  likeGame() {
    //need to pass the ip address
    this.ip_address = "123.12.132";
    this.gameService.update(this.selected_id, this.ip_address).subscribe(data => {
      this.game_likes = data;
    });
  }

  toggleModal(){
    this.display_show = !this.display_show
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.image_path);
  }
}
