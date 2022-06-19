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
      console.log(data)
      this.display_show = true;
      this.game = data;
      this.selected_id = data.id;
      this.game_likes = data.likes_count;
      if( data.image_url != null ){
        this.image_path = data.image_url;
      }else{
        this.image_path = "https://www.metalgearinformer.com/wp-content/uploads/2014/10/Figma-Metal-Gear-Solid-2-Snake-8.jpg";
      }
    });
  }

  likeGame() {
    this.gameService.update(this.selected_id, this.ipAddress).subscribe(data => {
      console.log(data)
      if(data.errors){
        this.game_likes = data.errors.ip_address
      }else{
        this.game_likes = data.likes;
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
