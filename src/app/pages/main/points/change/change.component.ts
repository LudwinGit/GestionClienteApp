import { Component, inject, Input } from '@angular/core';
import { Timestamp, where } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs';
import { Point } from 'src/app/common/models/point.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent {
  @Input()
  set max(value: number) {
    if (this.form) {
      this.form.controls.points.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(value)
      ]);
      this.form.controls.points.updateValueAndValidity();
    }
  }

  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)

  form = new FormGroup({
    date: new FormControl(),
    points: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
    description: new FormControl('Canje de punto', [Validators.required]),
    uid: new FormControl(this.user().uid)
  })

  async submit() {
    if (this.getMaxPoints() < this.form.value.points) {
      this.utilSvc.presentToast({
        message: 'No tienes suficientes puntos',
        color: 'danger',
        duration: 2500
      })
      this.utilSvc.dismissModal({ success: true })
      return
    }

    if (this.form.valid) {
      let path = `points`

      const guatemalaTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Guatemala',
      });

      const localDate = new Date(guatemalaTime);
      const firebaseTimestamp = Timestamp.fromDate(localDate);

      this.form.controls.date.setValue(firebaseTimestamp)
      this.form.controls.points.setValue(this.form.value.points * -1)
      const loading = await this.utilSvc.loading('Guardando...')
      await loading.present()
      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
        this.utilSvc.dismissModal({ success: true })
      })
        .catch(error => {
          this.utilSvc.presentToast({
            message: error.message,
            color: 'danger',
            duration: 2500
          })
        })
        .finally(() => {
          loading.dismiss()
        })
    }
  }

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  getMaxPoints() {
    let max = 0;
    this.firebaseSvc.getCollectionChanges('points', where('uid', '==', this.user().uid)).pipe(
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
      .subscribe((data: Point[]) => {
        max = data.reduce((total, point) => total + point.points, 0);
      })

    return max
  }
}
