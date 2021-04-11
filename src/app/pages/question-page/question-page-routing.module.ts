import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionPagePage } from './question-page.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionPagePageRoutingModule {}
