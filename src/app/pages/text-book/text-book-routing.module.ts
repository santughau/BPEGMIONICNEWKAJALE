import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextBookPage } from './text-book.page';

const routes: Routes = [
  {
    path: '',
    component: TextBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextBookPageRoutingModule {}
