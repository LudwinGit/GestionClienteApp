import { Component, inject } from '@angular/core';
import { orderBy, where } from 'firebase/firestore';
import { map, catchError } from 'rxjs';
import { Point } from 'src/app/common/models/point.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';
import { ChangeComponent } from './change/change.component';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  points: Point[] = []

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getPoints()
  }

  getPoints() {
    this.firebaseSvc.getCollectionChanges('points', where('uid', '==', this.user().uid), orderBy('date', 'desc')).pipe(
      map((items: any[]) =>
        items.map(item => ({
          ...item,
          date: item.date.toDate()
        }))
      ),
      catchError(error => {
        console.log(error)
        return []
      })
    )
      .subscribe((data: any[]) => {
        this.points = data
      })
  }

  getTotalPoints() {
    return this.points.reduce((total, point) => total + point.points, 0)
  }

  async changePoints() {
    const totalPoints = this.getTotalPoints();
    let success = await this.utilSvc.presentModal({
      component: ChangeComponent,
      cssClass: 'add-update-modal',
      componentProps: { max: totalPoints }
    })

    if (success) this.getPoints()
  }
}
