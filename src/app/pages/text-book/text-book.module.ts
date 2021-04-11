import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextBookPageRoutingModule } from './text-book-routing.module';

import { TextBookPage } from './text-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextBookPageRoutingModule
  ],
  declarations: [TextBookPage]
})
export class TextBookPageModule {}
