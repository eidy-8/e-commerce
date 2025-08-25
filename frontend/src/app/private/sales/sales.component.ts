import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit, OnDestroy {

  salesList: any = [];
  currentPage: number = 1;
  hasNext: boolean = false;

  private unsubscribe = new Subject<void>;

  protected isLoading$: Observable<boolean>;

  constructor(public loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {}

  private getSales(searchTerm: string = '') {
    // this.productService.getProduct(searchTerm, this.currentPage, this.pageSize, this.sellerId)
    // .pipe(takeUntil(this.unsubscribe))
    // .subscribe((res: any) => {                
    //   this.productsList = res.data; 
    //   this.hasNext = res.hasNext; 
    // });
  }

  onSearch(searchTerm: string) {

  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.getSales();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getSales();
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
