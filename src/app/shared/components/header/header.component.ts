import { Component, inject, Input } from '@angular/core';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenuButton!: boolean;

  utilsSvc = inject(UtilsService)

  closeModal() {
    this.utilsSvc.dismissModal()
  }
}
