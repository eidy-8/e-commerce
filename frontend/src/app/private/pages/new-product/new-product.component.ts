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
        this.router.navigate([ '/user/new-product/product-form/4935a834-10ee-408c-b573-987ff8533c20']);
        break;
      }
      case 1: {
        this.router.navigate(['/user/new-product/product-form/4935a834-10ee-408c-b573-987ff8533c20']);
        break;
      }
      case 2: {
        this.router.navigate(['/user/new-product/product-form/b4357830-ea29-4228-9990-add55a008ea9']);
        break;
      }
      case 3: {
        this.router.navigate(['/user/new-product/product-form/5d4872fc-b17e-4aa3-b5f7-2dc69f66f2c1']);
        break;
      }
      case 4: {
        this.router.navigate(['/user/new-product/product-form/5a806c73-d955-42a5-9db2-71c69fa2ad75']);
        break;
      }
      case 5: {
        this.router.navigate(['/user/new-product/product-form/9af6620e-2392-4ff9-a5f0-22b1f15b0bb6']);
        break;
      }
      case 6: {
        this.router.navigate(['/user/new-product/product-form/9d41e1af-ece6-4e14-bf0a-8f7ef8c92980']);
        break;
      }
      case 7: {
        this.router.navigate(['/user/new-product/product-form/cb02e070-e621-474a-bd9b-be2b05a7b29d']);
        break;
      }
      case 8: {
        this.router.navigate(['/user/new-product/product-form/1b30d362-085a-44a5-a0e6-c2dc9b969349']);
        break;
      }
    }
  }

  constructor(private router: Router) {}
}
