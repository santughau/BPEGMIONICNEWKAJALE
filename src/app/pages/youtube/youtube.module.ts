import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubePageRoutingModule } from './youtube-routing.module';

import { YoutubePage } from './youtube.page';
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubePageRoutingModule
  ],
  providers: [YoutubeVideoPlayer],
  declarations: [YoutubePage]
})
export class YoutubePageModule { }
