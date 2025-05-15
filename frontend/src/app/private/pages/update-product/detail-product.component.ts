import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit, OnDestroy {

  protected productId: any;

  private unsubscribe = new Subject<void>;

  constructor(private route: ActivatedRoute, private router: Router, public productService: ProductService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

    this.getProducts(this.productId);
  }

  private getProducts(productId: any) {    
    this.productService.getProduct('', 1, 10, productId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {        
        console.log(res.data[0]);
      });
  }

  protected goBack() {
    this.router.navigate(['/user/my-products']);
  }
  
  onConfirmTitleChange(): void {
    console.log('Ação confirmada!');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
