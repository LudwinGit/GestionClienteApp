import { Component, Input } from '@angular/core';

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
}
