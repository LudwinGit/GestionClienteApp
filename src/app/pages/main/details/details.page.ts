import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs';
import { Detail } from 'src/app/common/models/detail.model';
import { Order } from 'src/app/common/models/order.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)

  id = this.route.snapshot.paramMap.get('id');
  details: Detail[] = []
  order: Order

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getDetails()
  }

  getDetails() {
    let path = `orders/${this.id}/details`
    this.firebaseSvc.getCollectionChanges(path).pipe(
      map((items: any[]) => items.map(item => ({
        ...item,
        date_limit: item.date_limit?.toDate(),
        date_payment: item.date_payment?.toDate()
      }))),
      catchError(error => {
        console.log(error)
        return []
      })
    )
      .subscribe((data: any[]) => {
        this.details = data
      })
    this.getOrder()
  }

  getOrder() {
    let path = `orders/${this.id}`
    this.firebaseSvc.getDocument(path).then((data: any) => {
      this.order = data
      this.order.date = data.date.toDate()
    })
  }
}
