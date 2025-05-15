import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../auth/guards/auth.guard';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailProductComponent } from './pages/update-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    //canActivate: [authGuard],
    children: [
      {
        path: 'new-product',
        component: NewProductComponent
      },
      {
        path: 'new-product/product-form/:category',
        component: ProductFormComponent
      },
      {
        path: 'my-products',
        component: ProductsComponent
      },
      {
        path: 'detail-product/:productId',
        component: DetailProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
