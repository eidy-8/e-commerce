import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/components/product-manager/product-manager.component';
import { ProductService } from '../../services/product.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  listaDeProdutos: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  hasNext: boolean = false;

  private unsubscribe = new Subject<void>;

  protected isLoading$: Observable<boolean>;

  constructor(public productService: ProductService, public loadingService: LoadingService, private router: Router) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(searchTerm: string = '') {
    this.productService.getProduct(searchTerm, this.currentPage, this.pageSize)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {        
        this.listaDeProdutos = res.data; 
        this.hasNext = res.hasNext; 
      });
  }

  onSearch(searchTerm: string) {    
    this.currentPage = 1; 
    this.getProducts(searchTerm);
  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.getProducts();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  navigateToNewProduct(): void {
    this.router.navigate(['/user/new-product']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
