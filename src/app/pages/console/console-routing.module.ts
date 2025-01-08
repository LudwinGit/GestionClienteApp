import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsolePage } from './console.page';

const routes: Routes = [
  {
    path: '',
    component: ConsolePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsPageModule)
      },
      {
        path: 'balances',
        loadChildren: () => import('./balances/balance.module').then(m => m.BalancePageModule)
      },
      {
        path: 'point/:id',
        loadChildren: () => import('./point/point.module').then(m => m.PointPageModule)
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsolePageRoutingModule { }
