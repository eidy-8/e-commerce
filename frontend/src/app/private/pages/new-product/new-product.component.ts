import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  protected chooseCategory(category: number) {
    switch (category) {
      case 0: {
        this.router.navigate([ '/user/new-product/product-form/comida']);
        break;
      }
      case 1: {
        this.router.navigate(['/user/new-product/product-form/tecnologia']);
        break;
      }
      case 2: {
        this.router.navigate(['/user/new-product/product-form/moda']);
        break;
      }
      case 3: {
        this.router.navigate(['/user/new-product/product-form/moveis']);
        break;
      }
      case 4: {
        this.router.navigate(['/user/new-product/product-form/limpeza']);
        break;
      }
      case 5: {
        this.router.navigate(['/user/new-product/product-form/brinquedo']);
        break;
      }
      case 6: {
        this.router.navigate(['/user/new-product/product-form/esporte']);
        break;
      }
      case 7: {
        this.router.navigate(['/user/new-product/product-form/veiculo']);
        break;
      }
      case 8: {
        this.router.navigate(['/user/new-product/product-form/beleza']);
        break;
      }
    }
  }

  constructor(private router: Router) {}
}
