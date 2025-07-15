import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(public loadingService: LoadingService, private route: ActivatedRoute, public productService: ProductService, public userService: UserService, public cartService: CartService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('productId'); 

    this.getProducts(this.id);
  }

  protected isLoading$: Observable<boolean>;

  protected id: any;

  private unsubscribe = new Subject<void>;

  public totalProduct: number = 0;

  protected total: number = 0;

  public products: any;

  private getProducts(productId: string) {    
    this.productService.getProduct('', 1, 1, '', productId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     

      if (res.data.length == 0) {
        this.getUser();
      } else {
        this.totalProduct = 1;
        this.total = res.data[0].price;
      }
    });
  }

  private getUser(){
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.getCartItems(res.data.buyerId);
    });
  }

  private getCartItems(buyerId: any) {    
    this.cartService.getCart(buyerId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {      
      this.products = res; 

      this.totalProduct = res.length;
      
      for (let i = 0; i < this.totalProduct; i++) {
        this.total += Number(res[i].preco); 
      }
    });
  }

  ngOnDestroy(): void {
    console.clear();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
