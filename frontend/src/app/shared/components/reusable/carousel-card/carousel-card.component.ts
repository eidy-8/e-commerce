import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.css'
})
export class CarouselCardComponent {
  @Input() cards: any[] = [];
  @Input() cardsPerPage: number = 6;
  @Input() scrollStep: number = 6; 
  currentIndex: number = 0; 

  next() {
    const maxIndex = this.cards.length - this.cardsPerPage;
    if (this.currentIndex < maxIndex) {
      this.currentIndex = Math.min(this.currentIndex + this.scrollStep, maxIndex);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex = Math.max(this.currentIndex - this.scrollStep, 0);
    }
  }

  getTransform() {
    return `translateX(-${this.currentIndex * (100 / this.cardsPerPage)}%)`;
  }
}
