import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() control!: FormControl
  @Input() type!: string
  @Input() label!: string
  @Input() autocomplete!: string
  @Input() icon!: string
  hide: boolean = true

  showOrHidePassword() {
    this.hide = !this.hide
    if (this.hide) {
      this.type = 'password'
    } else {
      this.type = 'text'
    }
  }
}
