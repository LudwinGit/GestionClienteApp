import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../common/services/firebase.service';
import { UtilsService } from '../common/services/utils.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  private readonly firebaseService = inject(FirebaseService);
  private readonly utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    return new Promise((resolve) => {
      this.firebaseService.getAuth().onAuthStateChanged((auth) => {
        if (!auth) resolve(true);
        else {
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
      })
    });
  }
}