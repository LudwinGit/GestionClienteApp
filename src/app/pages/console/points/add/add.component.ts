import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() uid!: string
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)

  form = new FormGroup({
    date: new FormControl(),
    points: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
    description: new FormControl(null, [Validators.required]),
    uid: new FormControl(null)
  })

  async submit() {
    if (this.form.valid) {
      let path = `points`
      this.form.controls.date.setValue(this.utilSvc.getTimestampCurrent())
      this.form.controls.points.setValue(this.form.value.points * 1)
      this.form.controls.uid.setValue(this.uid)
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
}
