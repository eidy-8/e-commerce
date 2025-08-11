import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../auth/guards/auth.guard';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderComponent } from './pages/order/order.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { PurchaseDetailComponent } from './pages/purchase-detail/purchase-detail.component';

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
        path: 'update-product/:productId',
        component: UpdateProductComponent
      },
      {
        path: 'my-wishlist',
        component: WishlistComponent
      },
      {
        path: 'my-cart',
        component: CartComponent
      },
      {
        path: 'payment/:id',
        component: PaymentComponent
      },
      {
        path: 'order/:productId/:paymentMethodId',
        component: OrderComponent
      },
      {
        path: 'my-purchases',
        component: PurchasesComponent
      },
      {
        path: 'my-purchases/:orderId',
        component: PurchaseDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
