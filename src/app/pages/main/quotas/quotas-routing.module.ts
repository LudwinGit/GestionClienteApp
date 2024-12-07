import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotasPage } from './quotas.page';

const routes: Routes = [
  {
    path: '',
    component: QuotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotasPageRoutingModule {}
