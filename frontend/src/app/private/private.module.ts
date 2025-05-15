import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailProductComponent } from './pages/update-product/detail-product.component';


@NgModule({
  declarations: [
    MainComponent,
    NewProductComponent,
    ProductFormComponent,
    ProductsComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
