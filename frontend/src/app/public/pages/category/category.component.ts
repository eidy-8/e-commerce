import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../private/services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy {
  protected categoryId: any;

  listaDeProdutos: any[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  hasNext: boolean = false;

  private unsubscribe = new Subject<void>;

  private getProducts() {
      this.productService.getProduct('', this.currentPage, this.pageSize, '', '', '4935a834-10ee-408c-b573-987ff8533c20')
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res: any) => {                 
          this.listaDeProdutos = res.data; 
          this.hasNext = res.hasNext; 
        });
    }

  constructor(private route: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId'); 

    this.getProducts();
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
