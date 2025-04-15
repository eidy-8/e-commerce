import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slidable-menu',
  templateUrl: './slidable-menu.component.html',
  styleUrl: './slidable-menu.component.css'
})
export class SlidableMenuComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
