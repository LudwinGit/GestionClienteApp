import { Component, inject } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Point } from 'src/app/common/models/point.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)
  points: Point[] = []


  //obtener el id que viene en la ruta 
  id = this.route.snapshot.paramMap.get('id');

  ionViewWillEnter() {
    this.getPoints()
  }

  getPoints() {
    this.firebaseSvc.getCollectionChanges('points', where('uid', '==', this.id), orderBy('date', 'desc')).pipe(
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
}
