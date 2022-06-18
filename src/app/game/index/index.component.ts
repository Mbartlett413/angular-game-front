import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient  } from '@angular/common/http';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  games?: Game[];
  game?: Game;
  display_show = false;
  selected_id: number = 0;
  game_likes: String = "";
  ipAddress: String = "";
  image_path: any;

  constructor(public gameService: GameService,
              private sanitizer: DomSanitizer,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.getIPAddress()
    this.gameService.getAll().subscribe(data => {
      this.games = data;
    });
  }

  showGame(id: number) {
    this.gameService.find(id).subscribe(data => {
      this.display_show = true;
      this.game = data.game;
      this.selected_id = data.game.id;
      this.game_likes = data.likes;
      this.image_path = 'data:image/png;base64, ' + data.image ;
    });
  }

  likeGame() {
    this.gameService.update(this.selected_id, this.ipAddress).subscribe(data => {
      if(data.errors){
        this.game_likes = data.errors[0]
      }else{
        this.game_likes = data;
      }
    });
  }

  toggleModal(){
    this.display_show = !this.display_show
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.image_path);
  }

  getIPAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
}
