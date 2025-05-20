import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit, OnDestroy {

  protected productId: any;

  protected productName: any;

  protected isNameError: boolean = false;
  protected blurFirstStep: boolean = false;

  private unsubscribe = new Subject<void>;

  constructor(private route: ActivatedRoute, private router: Router, public productService: ProductService, private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId'); 

    this.getProducts(this.productId);
  }

  private getProducts(productId: any) {    
    this.productService.getProduct('', 1, 10, productId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {     
        this.productName = res.data[0].name;
      });
  }

  protected goBack() {
    this.router.navigate(['/user/my-products']);
  }
  
  onConfirmTitleChange(): void {
    console.log("confirmChange");
    
    let productUpdate = {
      name: this.productName
    }

    this.productService.putProduct(productUpdate, this.productId).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        console.log(res.message);
        
        this.toasterService.show({
          type: 'success',
          title: 'Sucesso',
          message: res.message
        });
      },
      error: error => {    
        this.toasterService.show({
          type: 'error',
          title: 'Erro',
          message: error
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
