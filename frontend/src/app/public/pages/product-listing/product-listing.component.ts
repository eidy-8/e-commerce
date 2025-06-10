import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../private/services/product.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CategoryService } from '../../../private/services/category.service';
import { UserService } from '../../../private/services/user.service';
import { WishListService } from '../../../private/services/wish-list.service';
import { ToasterService } from '../../../shared/services/toaster.service';

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

  protected isOwnProduct!: boolean;

  protected buyerId!: string;

  constructor(private route: ActivatedRoute, public productService: ProductService, public categoryService: CategoryService, private userService: UserService, private router: Router, private wishListService: WishListService, private toasterService: ToasterService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth <= 768) { 
      this.catalogCardsPerPage = 2;
      this.catalogScrollStep = 2;
    }
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

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

    this.getProducts(this.productId);

    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {       
      this.buyerId = res.data.buyerId;      

      this.wishListService.getWishList(this.buyerId).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {          
          if (this.productId == res[i].product_id) {
            this.isFavorited = true;
            break;
          }
        }
      });
    });
  }

  private getProducts(productId: string) {    
    this.productService.getProduct('', 1, 10, '', productId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     
      
      this.product = {
        title: res.data[0].name,
        price: res.data[0].price,
        condition: res.data[0].isused,
        soldQuantity: res.data[0].sale,
        availableQuantity: res.data[0].quantity, 
        description: res.data[0].description
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
    const product = { "productId": this.productId }

    if (this.isFavorited == false) {
      this.wishListService.postWishList(this.buyerId, product).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.isFavorited = true;
        },
        error: error => {
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error
          });
        }
      });
    } else {
      this.wishListService.deleteFromWishList(this.buyerId, product).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.isFavorited = false;
        },
        error: error => {
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error
          });
        }
      });
    }
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
    console.clear();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
