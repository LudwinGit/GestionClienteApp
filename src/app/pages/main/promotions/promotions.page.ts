import { Component, inject, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Promotion } from 'src/app/common/models/promotion.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  promotions: Promotion[] = []

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getPromotions()
  }

  getPromotions() {
    let path = 'promotions'
    this.firebaseSvc.getCollectionChanges(path).pipe(
      map((items: any[]) =>
        items.map(item => ({
          ...item,
          start: item.start.toDate(),
          end: item.end.toDate()
        }))
      ),
      catchError(error => {
        console.log(error)
        return []
      })
    )
      .subscribe((data: any[]) => {
        this.promotions = data
      })
  }
}
