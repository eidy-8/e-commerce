import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WishListService } from '../../../private/services/wish-list.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../private/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {

  protected productId: any;

  private _products: any[] = [];

  isFavorited: boolean = false;

  private unsubscribe = new Subject<void>;

  protected buyerId!: string;

  constructor (private wishListService: WishListService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {       
      this.buyerId = res.data.buyerId;   
    });
  }

  @Input() set products(value: any[]) {
    this._products = value.map(p => ({ ...p, isFavorited: false }));
  }

  get products() {
    return this._products;
  }

  toggleFavorite(p: any): void {        
    const product = { "productId": p.id }
    p.isFavorited = true;
    
    this.wishListService.postWishList(this.buyerId, product).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
      }
    });
  }

  goToProduct(productId: string) {
    this.router.navigate(['/', productId]);
  }

  ngOnDestroy(): void {
    console.clear();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
