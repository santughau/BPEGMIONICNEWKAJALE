import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPagePageRoutingModule } from './question-page-routing.module';

import { QuestionPagePage } from './question-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPagePageRoutingModule
  ],
  declarations: [QuestionPagePage]
})
export class QuestionPagePageModule {}
