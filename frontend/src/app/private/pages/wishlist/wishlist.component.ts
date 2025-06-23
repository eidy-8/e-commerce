import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserService } from '../../services/user.service';
import { WishListService } from '../../services/wish-list.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit, OnDestroy {
  protected isLoading$: Observable<boolean>;

  buyerId!: string;

  public products: any;

  private unsubscribe = new Subject<void>;

  constructor(private toasterService: ToasterService, public wishListService: WishListService, public loadingService: LoadingService, private userService: UserService, private router: Router) {
    this.isLoading$ = this.loadingService.loading$;
  }

  navigateToProduct(productId: string) {    
    this.router.navigate([ '/', productId ])
  }

  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.buyerId = res.data.buyerId
      
      this.getWishList();
    });
  }

  private getWishList() {
    this.wishListService.getWishList(this.buyerId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {      
        this.products = res; 
        console.log(res);
      });
  }

  public excludeFromTheList(productId: any) {

    const product = { "productId": productId }

    this.wishListService.deleteFromWishList(this.buyerId, product).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: res => {
          this.toasterService.show({
            type: 'success',
            title: 'Sucesso',
            message: res.message
          });

          this.getWishList();
        },
        error: error => {
          this.toasterService.show({
            type: 'error',
            title: 'Erro',
            message: error.message
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
