import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PaymentService } from '../../services/payment.service';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(public loadingService: LoadingService, private route: ActivatedRoute, public productService: ProductService, public userService: UserService, public cartService: CartService, private router: Router, private paymentService: PaymentService, private toasterService: ToasterService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('productId'); 

    this.paymentMethodId = this.route.snapshot.paramMap.get('paymentMethodId'); 

    this.getProducts(this.id);

    switch (this.paymentMethodId) {
      case "e9d59d6e-94fc-4aa4-8e79-d176d29778d2":
        this.paymentMethodLabel = "Crédito"
        break
      case "275ae4dc-5919-4400-beed-2313783f598e":
        this.paymentMethodLabel = "Débito"
        break
      case "cbc8dc06-9e95-4212-a18f-e985f110b65a":
        this.paymentMethodLabel = "Pix"
        break
      case "6557586e-597b-4430-8a6c-5c752889cfc6":
        this.paymentMethodLabel = "Boleto"
        break
    }
  }

  protected isLoading$: Observable<boolean>;

  protected id: any;

  private unsubscribe = new Subject<void>;

  public totalProduct: number = 0;

  protected total: number = 0;

  public products: any;

  protected paymentMethodId: any;

  protected paymentMethodLabel: any;

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

  public changePaymentMethod() {
    this.router.navigate([ 'user/payment', this.id ]);
  }

  public purchase() {
    // this.router.navigate([ 'user/my-purchases' ]);

    const payTypeData = { payType_id: this.paymentMethodId }

    this.paymentService.postPayment(payTypeData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          
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

  ngOnDestroy(): void {
    console.clear();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
