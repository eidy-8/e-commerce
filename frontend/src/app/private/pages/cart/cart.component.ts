import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ToasterService } from '../../../shared/services/toaster.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  protected isLoading$: Observable<boolean>;

  public id: any;
  public products: any;
  public totalProduct!: number;
  public totalPrice: any;

  private unsubscribe = new Subject<void>;

  buyerId!: string;

  constructor(private toasterService: ToasterService, public loadingService: LoadingService, private userService: UserService, private router: Router, private cartService: CartService) {
      this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.buyerId = res.data.buyerId
      
      this.getCart();
    });
  }

  navigateToProduct(productId: string) {    
    this.router.navigate([ '/', productId ])
  }

  public excludeFromTheList(productId: any) {
  
    const product = { "productId": productId }

    this.cartService.deleteFromCart(this.buyerId, product).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.getCart();
        },
        error: error => {
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error.message
          });
        }
      });
  }

  private getCart() {
    this.cartService.getCart(this.buyerId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {    
        this.id = res[0].cart_id;         
        this.products = res; 
        this.totalProduct = res.length;

        this.totalPrice = 0; 

        for (let i = 0; i < this.totalProduct; i++) {
          this.totalPrice += Number(res[i].preco); // converte para número
        }
      });
  }

  buyNow(): void {
    this.router.navigate([ '/user/payment', this.id ]);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
