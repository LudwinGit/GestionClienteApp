import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private readonly utilsSvc = inject(UtilsService)
  private readonly firebaseSvc = inject(FirebaseService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading('Ingresando...')
      await loading.present()
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        if (res.user) {
          this.getUserInfo(res.user.uid)
        }
      })
        .catch(err => {
          this.utilsSvc.presentToast({
            // message: err.message,
            message: 'El correo o la contraseña son incorrectos',
            color: 'danger',
            duration: 2000
          })
        })
        .finally(() => {
          loading.dismiss()
        });
    }
  }

  async getUserInfo(uid: string) {
    const loading = await this.utilsSvc.loading('')
    await loading.present()

    let path = `customers/${uid}`

    this.firebaseSvc.getDocument(path).then((user: User) => {
      this.utilsSvc.saveInLocalStorage('user', user)
      this.utilsSvc.routerLink('/main/home')
      this.form.reset()

      this.utilsSvc.presentToast({
        message: `Bienvenido ${user.name}`,
        duration: 500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).catch(error => {
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
