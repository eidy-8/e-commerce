import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.css'
})
export class PurchaseDetailComponent implements OnInit {

  protected isLoading$: Observable<boolean>;
  public products: any[] = [];
  public totalProduct!: number;
  public totalPrice: any;
  public orderId: any;

  private unsubscribe = new Subject<void>;

  constructor(private route: ActivatedRoute, public loadingService: LoadingService, private orderService: OrderService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId'); 

    this.getOrders();
  }

  private getOrders() {
    this.orderService.getOrder(0, 0, undefined, this.orderId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res: any) => {       
      console.log(res);
       
      this.totalProduct = res.products.length;

      this.totalPrice = 0;

      for (let i = 0; i < this.totalProduct; i++) {
        this.totalPrice += Number(res.products[i].preco);
      }

      this.products = res.products;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
