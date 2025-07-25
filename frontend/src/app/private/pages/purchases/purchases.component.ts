import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent implements OnInit, OnDestroy {

  ordersList: any = [];
  protected isLoading$: Observable<boolean>;
  currentPage: number = 1;
  hasNext: boolean = false;
  pageSize: number = 10;

  sellerId!: string;

  private unsubscribe = new Subject<void>;

  constructor(public productService: ProductService, public loadingService: LoadingService, private userService: UserService) {
    this.isLoading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.sellerId = res.data.sellerId
      this.getProducts();
    });
  }

  private getProducts(searchTerm: string = '') {
    this.productService.getProduct(searchTerm, this.currentPage, this.pageSize, this.sellerId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {                
        this.ordersList = res.data; 
        this.hasNext = res.hasNext; 
      });
  }

  onSearch(searchTerm: string) {    
    // this.currentPage = 1; 
    // this.getProducts(searchTerm);
  }

  previousPage() {
    // if (this.currentPage > 1) {
    //   this.currentPage--;
    //   this.getProducts();
    // }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }

  nextPage() {
    // if (this.hasNext) {
    //   this.currentPage++;
    //   this.getProducts();
    // }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth' 
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
