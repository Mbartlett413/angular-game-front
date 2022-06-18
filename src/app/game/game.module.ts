import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
