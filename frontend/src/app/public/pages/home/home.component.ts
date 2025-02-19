import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { YouTubePlayerConfig } from '@angular/youtube-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected cards = [{}];
  protected products = [{}];
  protected product = [{}];
  protected cardsPerPage: number = 6;
  protected scrollStep: number = 6;
  protected catalogCardsPerPage: number = 6;
  protected catalogScrollStep: number = 6;

  protected playerVars = {
    autoplay: 1, 
    controls: 1, 
    showinfo: 0,
    rel: 0
  };

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth <= 768) { 
      this.cardsPerPage = 1;
      this.scrollStep = 1;

      this.catalogCardsPerPage = 2;
      this.catalogScrollStep = 2;
    }
  }

  ngOnInit(): void {
    this.cards = [
      { title: 'Comida', description: 'Sua comida favorita esperando por você.', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Tecnologia', description: 'Fique ligado nas novas tecnologias do mercado.', image: '../../../../assets/undraw_mobile-images_b202.svg', link: 'http://localhost:4200/' },
      { title: 'Moda', description: 'Acessórios e roupas para realçar o seu estilo.', image: '../../../../assets/undraw_window-shopping_9l2k.svg', link: 'http://localhost:4200/' },
      { title: 'Móveis', description: 'Móveis para o lar que você merece.', image: '../../../../assets/undraw_special-event_hv54.svg', link: 'http://localhost:4200/' },
      { title: 'Limpeza', description: 'Produtos de limpeza para uma ambiente limpo e agradável.', image: '../../../../assets/undraw_clean-up_af4s.svg', link: 'http://localhost:4200/' },
      { title: 'Brinquedo', description: 'Não precisa ser dia das crianças para presentear uma criança.', image: '../../../../assets/undraw_toy-car_ugyu.svg', link: 'http://localhost:4200/' },
      { title: 'Card 7', description: 'Descrição do Card 7', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Card 8', description: 'Descrição do Card 8', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Card 9', description: 'Descrição do Card 9', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' }
    ];

    this.products = [
      { title: 'Comida', price: '1 real', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Tecnologia', price: '1 real', image: '../../../../assets/undraw_mobile-images_b202.svg', link: 'http://localhost:4200/' },
      { title: 'Moda', price: '1 real', image: '../../../../assets/undraw_window-shopping_9l2k.svg', link: 'http://localhost:4200/' },
      { title: 'Móveis', price: '1 real', image: '../../../../assets/undraw_special-event_hv54.svg', link: 'http://localhost:4200/' },
      { title: 'Limpeza', price: '1 real', image: '../../../../assets/undraw_clean-up_af4s.svg', link: 'http://localhost:4200/' },
      { title: 'Brinquedo', price: '1 real', image: '../../../../assets/undraw_toy-car_ugyu.svg', link: 'http://localhost:4200/' },
      { title: 'Card 7', price: '1 real', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Card 8', price: '1 real', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' },
      { title: 'Card 9', price: '1 real', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' }
    ];

    this.product = [
      { title: 'Comida', price: '1 real', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/' }
    ]

    this.onResize();
  }
}
