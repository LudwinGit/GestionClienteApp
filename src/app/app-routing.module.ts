import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'main',
    canActivate: [UserRoleGuard],
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'console',
    canActivate: [AdminRoleGuard],
    loadChildren: () => import('./pages/console/console.module').then(m => m.ConsolePageModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
