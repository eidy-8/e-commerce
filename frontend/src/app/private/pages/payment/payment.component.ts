import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentMethodService } from '../../services/payment-method.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ToasterService } from '../../../shared/services/toaster.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(private toasterService: ToasterService, public loadingService: LoadingService, public productService: ProductService, private route: ActivatedRoute, public paymentMethodsService: PaymentMethodService, private router: Router, public cartService: CartService, public userService: UserService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); 

    this.getUser();

    this.getProducts(this.id);

    this.getPaymentMethods();
  }

  protected isLoading$: Observable<boolean>;

  protected id: any;

  private unsubscribe = new Subject<void>;

  protected total!: number;

  protected buyerId: any;

  public totalProduct!: number;

  protected groupedOptions: any[] = [
    {
      id: '1',
      paymentmethod: 'Crédito'
    },
    {
      id: '2',
      paymentmethod: 'Pix'
    },
    {
      id: '3',
      paymentmethod: 'Boleto'
    },
    {
      id: '4',
      paymentmethod: 'Débito'
    }
  ];

  selectedMethod: string | null = null;

  private getProducts(productId: string) {    
    this.productService.getProduct('', 1, 1, '', productId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     

      if (res.data.length == 0) {
        this.getCartItems();
      } else {
        this.total = res.data[0].price;
      }
    });
  }

  private getPaymentMethods() {
    this.paymentMethodsService.getPaymentMethods()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {     
      
      this.groupedOptions = res.data;
    });
  }

  private getCartItems() {
    this.cartService.getCart(this.buyerId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {      
      this.totalProduct = res.length;
      
      for (let i = 0; i < this.totalProduct; i++) {
        this.total += Number(res[i].preco); 
      }

      console.log(res[0].preco);
    });
  }

  private getUser(){
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.buyerId = res.data.buyerId;      
    });
  }

  selectMethod(id: string): void {
    this.selectedMethod = id;
  }

  continue(selectedMethod: any) {
    if (selectedMethod) {
      // this.router.navigate([ '/order', selectedMethod ]);
      console.log(selectedMethod);
    } else {
      this.toasterService.show({
        type: 'error',
        title: 'Erro',
        message: 'Selecione uma forma de pagamento.'
      });
    }
  }

  ngOnDestroy(): void {
    console.clear();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
