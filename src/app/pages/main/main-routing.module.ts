import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'points',
        loadChildren: () => import('./points/points.module').then(m => m.PointsPageModule)
      },
      {
        path: 'promotions',
        loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsPageModule)
      },
      {
        path: 'quotas/:id',
        loadChildren: () => import('./quotas/quotas.module').then(m => m.QuotasPageModule)
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
