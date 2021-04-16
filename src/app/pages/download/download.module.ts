import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadPageRoutingModule } from './download-routing.module';

import { DownloadPage } from './download.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule, Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    DownloadPageRoutingModule
  ],
  declarations: [DownloadPage]
})
export class DownloadPageModule {}
