import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../common/services/firebase.service';
import { UtilsService } from '../common/services/utils.service';

@Injectable({ providedIn: 'root' })
export class AdminRoleGuard implements CanActivate {

  private readonly firebaseService = inject(FirebaseService);
  private readonly utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    let user = this.utilsSvc.getFromLocalStorage('user')

    return new Promise((resolve) => {
      this.firebaseService.getAuth().onAuthStateChanged((auth) => {
        if (auth) {
          if (user && user.role == 'admin') resolve(true)
          else {
            this.utilsSvc.routerLink('/main');
            resolve(false);
          }
        }
        else {
          this.utilsSvc.routerLink('/auth');
          resolve(false);
        }
      })
    });
  }
}