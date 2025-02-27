import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrl: './popup-menu.component.css'
})
export class PopupMenuComponent {
  @Input() text: string = 'Passe o mouse aqui';
  visible = false;
  hideTimeout: any;

  showPopup() {
    this.visible = true;
    clearTimeout(this.hideTimeout);
  }

  startHideTimer() {
    this.hideTimeout = setTimeout(() => {
      this.visible = false;
    }, 500); 
  }
}
