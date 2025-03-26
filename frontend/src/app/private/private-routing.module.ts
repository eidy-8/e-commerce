import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../auth/guards/auth.guard';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
