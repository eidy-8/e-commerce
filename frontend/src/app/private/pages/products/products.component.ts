import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/components/product-manager/product-manager.component';
import { ProductService } from '../../services/product.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  listaDeProdutos: Product[] = [];

  private unsubscribe = new Subject<void>;

  protected isLoading$: Observable<boolean>;

  constructor(public productService: ProductService, public loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProduct().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {            
      this.listaDeProdutos = res;
    });
  }

  onSearch(searchTerm: string) {
    console.log(searchTerm);
    
    this.productService.getProduct(searchTerm).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.listaDeProdutos = res; 
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
