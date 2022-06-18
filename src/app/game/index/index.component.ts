import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';
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
  image_path: String = "https://www.metalgearinformer.com/wp-content/uploads/2014/10/Figma-Metal-Gear-Solid-2-Snake-8.jpg";

  constructor(public gameService: GameService,
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
      if( data.image != null ){
        this.image_path = data.image;
      }else{
        this.image_path = "https://www.metalgearinformer.com/wp-content/uploads/2014/10/Figma-Metal-Gear-Solid-2-Snake-8.jpg";
      }
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

  getIPAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
}
