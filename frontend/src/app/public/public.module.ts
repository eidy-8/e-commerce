import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductListingComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule { }
