import { Component, inject } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  utilSvc = inject(UtilsService)

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }
}
