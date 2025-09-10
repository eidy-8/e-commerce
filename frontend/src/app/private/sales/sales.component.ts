import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit, OnDestroy {

  ordersList: any = [];
  currentPage: number = 1;
  hasNext: boolean = false;
  pageSize: number = 10;

  sellerId!: string;
  buyerId!: string;

  private unsubscribe = new Subject<void>;

  protected isLoading$: Observable<boolean>;

  constructor(public loadingService: LoadingService, private userService: UserService, private orderService: OrderService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {    
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.sellerId = res.data.sellerId;
      this.getOrders();
    });
  }

  private getOrders() {
    this.orderService.getOrderBySellerId(this.currentPage, this.pageSize, this.sellerId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {        
        this.hasNext = res.hasNext; 

        console.log(res);
                
        this.ordersList = res;         
      });
  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.getOrders();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getOrders();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
