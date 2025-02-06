import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.css'
})
export class CarouselCardComponent {
  @Input() cards: any[] = [];
  currentIndex: number = 0; 
  cardsPerPage: number = 6;
  scrollStep: number = 3; 

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
