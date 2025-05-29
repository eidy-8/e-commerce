import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../private/services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../private/services/category.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit, OnDestroy {
  protected productId: any;

  private unsubscribe = new Subject<void>;

  public product: any = {};

  public images: any;

  mainImage: any;
  currentImageIndex: number = 0;

  isFavorited: boolean = false;

  showFullDescription: boolean = false;
  showFullDetails: boolean = false;

  category!: string;

  protected products = [{}];

  protected catalogCardsPerPage: number = 6;
  protected catalogScrollStep: number = 6;

  constructor(private route: ActivatedRoute, public productService: ProductService, public categoryService: CategoryService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth <= 768) { 
      this.catalogCardsPerPage = 2;
      this.catalogScrollStep = 2;
    }
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

    this.getProducts(this.productId);

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

    this.onResize();
  }

  private getProducts(productId: any) {    
    this.productService.getProduct('', 1, 10, productId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     
      this.product = {
        title: res.data[0].name,
        price: res.data[0].price,
        condition: res.data[0].isused,
        soldQuantity: res.data[0].sale,
        availableQuantity: res.data[0].quantity, 
        description: res.data[0].description,
        details: [
          { key: 'Marca', value: 'XYZ' },
          { key: 'Modelo', value: 'Pro 2023' },
          { key: 'Memória RAM', value: '6GB' },
          { key: 'Armazenamento', value: '128GB' },
          { key: 'Câmera', value: '48MP + 12MP + 5MP' },
          { key: 'Bateria', value: '4500mAh' },
          { key: 'Conectividade', value: '5G' }
        ]
      }

      this.images = [
        `${res.data[0].imageurl}`
      ];

      this.mainImage = this.images[0];      
      
      this.getCategory(res.data[0].category_id);
    });
  }

  private getCategory(categoryId: any) {    
    this.categoryService.getCategory(categoryId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     
      this.category = res.data[0].name;
    });
  }

  changeMainImage(index: number): void {
    this.currentImageIndex = index;
    this.mainImage = this.images[index];
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    console.log('Anúncio favoritado:', this.isFavorited ? 'Sim' : 'Não');
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  toggleDetails(): void {
    this.showFullDetails = !this.showFullDetails;
  }

  addToCart(): void {
    console.log('Produto adicionado ao carrinho:', this.product.title);
  }

  buyNow(): void {
    console.log('Iniciando compra do produto:', this.product.title);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
