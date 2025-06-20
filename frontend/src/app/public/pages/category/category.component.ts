import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../private/services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy {
  listaDeProdutos: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  hasNext: boolean = false;

  private unsubscribe = new Subject<void>;

  private getProducts() {
      this.productService.getProduct('', this.currentPage, this.pageSize, '266123bf-5c9b-4b07-9bf5-62b2abf107f7')
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res: any) => {                 
          this.listaDeProdutos = res.data; 
          this.hasNext = res.hasNext; 
        });
    }

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
