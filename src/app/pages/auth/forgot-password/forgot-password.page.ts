import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  private readonly utilsSvc = inject(UtilsService)
  private readonly firebaseSvc = inject(FirebaseService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading('Ingresando...')
      await loading.present()

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(() => {
        this.utilsSvc.presentToast({
          message: 'Se ha enviado un correo para restablecer tu contraseña, revisa tu bandeja de entrada o spam',
          color: 'primary',
          duration: 3000
        })
        this.form.reset()
        this.utilsSvc.routerLink('/auth')
      })
        .catch(error => {
          this.utilsSvc.presentToast({
            message: error.message,
            color: 'danger',
            duration: 2500
          })
        }).finally(() => {
          loading.dismiss()
        });
    }
  }
}
