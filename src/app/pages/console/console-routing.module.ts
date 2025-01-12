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
        path: 'location/:id',
        loadChildren: () => import('./locations/location.module').then(m => m.LocationPageModule)
      },
      {
        path: 'points/:id',
        loadChildren: () => import('./points/points.module').then(m => m.PointsPageModule)
      },
      {
        path: 'orders/:id',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'installments/:id',
        loadChildren: () => import('./installments/installments.module').then(m => m.InstallmentsPageModule)
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsolePageRoutingModule { }
