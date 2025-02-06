import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public cards = [{}];

  ngOnInit(): void {
    this.cards = [
      { title: 'Card 1', description: 'Descrição do Card 1' },
      { title: 'Card 2', description: 'Descrição do Card 2' },
      { title: 'Card 3', description: 'Descrição do Card 3' },
      { title: 'Card 4', description: 'Descrição do Card 4' },
      { title: 'Card 5', description: 'Descrição do Card 5' },
      { title: 'Card 6', description: 'Descrição do Card 6' },
      { title: 'Card 7', description: 'Descrição do Card 7' },
      { title: 'Card 8', description: 'Descrição do Card 8' },
      { title: 'Card 9', description: 'Descrição do Card 9' }
    ];
  }
}
