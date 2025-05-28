import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, public productService: ProductService, public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

    this.getProducts(this.productId);
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
