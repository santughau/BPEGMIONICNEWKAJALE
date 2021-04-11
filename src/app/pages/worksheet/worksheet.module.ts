import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPageRoutingModule } from './worksheet-routing.module';

import { WorksheetPage } from './worksheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPageRoutingModule
  ],
  declarations: [WorksheetPage]
})
export class WorksheetPageModule {}
