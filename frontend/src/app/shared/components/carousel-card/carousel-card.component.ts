import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.css'
})
export class CarouselCardComponent {
  @Input() cards: any[] = []; // Recebe o array de objetos
  currentIndex: number = 0; // Índice do primeiro card visível

  // Avançar os cards
  next() {
    if (this.currentIndex < this.cards.length - 6) {
      this.currentIndex++;
    }
  }

  // Voltar os cards
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Calcula o estilo para aplicar o deslocamento com animação
  getTransform() {
    return `translateX(-${this.currentIndex * (100 / 6)}%)`;
  }
}
