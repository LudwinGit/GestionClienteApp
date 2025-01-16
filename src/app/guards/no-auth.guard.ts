import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../common/services/firebase.service';
import { UtilsService } from '../common/services/utils.service';
import { User } from '../common/models/user.model';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  private readonly firebaseService = inject(FirebaseService);
  private readonly utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    return new Promise((resolve) => {
      this.firebaseService.getAuth().onAuthStateChanged(async (auth) => {
        if (!auth) resolve(true);
        else {
          if(!this.utilsSvc.getFromLocalStorage('user')){
            const user = (await this.firebaseService.getDocument(`users/${auth.uid}`)) as User;
            this.utilsSvc.saveInLocalStorage('user', user);
          }
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
      })
    });
  }
}