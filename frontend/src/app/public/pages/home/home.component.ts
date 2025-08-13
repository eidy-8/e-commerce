import { Component, HostListener, Inject, OnInit } from '@angular/core';

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
      { title: 'Comida', description: 'Sua comida favorita esperando por você.', image: '../../../../assets/undraw_breakfast_rgx5.svg', link: 'http://localhost:4200/category/4935a834-10ee-408c-b573-987ff8533c20' },
      { title: 'Tecnologia', description: 'Fique ligado nas novas tecnologias do mercado.', image: '../../../../assets/undraw_mobile-images_b202.svg', link: 'http://localhost:4200/category/e37a2ac8-f409-4e09-82f8-ce1616a4df36' },
      { title: 'Moda', description: 'Acessórios e roupas para realçar o seu estilo.', image: '../../../../assets/undraw_window-shopping_9l2k.svg', link: 'http://localhost:4200/category/b4357830-ea29-4228-9990-add55a008ea9' },
      { title: 'Móveis', description: 'Móveis para o lar que você merece.', image: '../../../../assets/undraw_special-event_hv54.svg', link: 'http://localhost:4200/category/5d4872fc-b17e-4aa3-b5f7-2dc69f66f2c1' },
      { title: 'Limpeza', description: 'Produtos de limpeza para uma ambiente limpo e agradável.', image: '../../../../assets/undraw_clean-up_af4s.svg', link: 'http://localhost:4200/category/5a806c73-d955-42a5-9db2-71c69fa2ad75' },
      { title: 'Brinquedo', description: 'Não precisa ser dia das crianças para presentear uma criança.', image: '../../../../assets/undraw_toy-car_ugyu.svg', link: 'http://localhost:4200/category/9af6620e-2392-4ff9-a5f0-22b1f15b0bb6' },
      { title: 'Esporte', description: 'Acessórios para cuidar da sua saúde.', image: '../../../../assets/undraw_grand-slam_xvhp.svg', link: 'http://localhost:4200/category/9d41e1af-ece6-4e14-bf0a-8f7ef8c92980' },
      { title: 'Veículos', description: 'Adquira o seu veículo dos sonhos.', image: '../../../../assets/undraw_on-the-way_ahi2.svg', link: 'http://localhost:4200/category/cb02e070-e621-474a-bd9b-be2b05a7b29d' },
      { title: 'Beleza', description: 'Todo auto-cuidado é pouco.', image: '../../../../assets/undraw_makeup-artist_0xtr.svg', link: 'http://localhost:4200/category/1b30d362-085a-44a5-a0e6-c2dc9b969349' }
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
