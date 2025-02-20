import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-dynamic',
  templateUrl: './footer-dynamic.component.html',
  styleUrl: './footer-dynamic.component.css',
  animations: [
    trigger('slideToggle', [
      transition(':enter', [
        style({ height: '0', opacity: 0, transform: 'translateY(20px)' }),
        animate('200ms ease-out', style({ height: '*', opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0', opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class FooterDynamicComponent {
  isOpen = false;

  toggleInfo() {
    this.isOpen = !this.isOpen;

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 200);
  }
}
