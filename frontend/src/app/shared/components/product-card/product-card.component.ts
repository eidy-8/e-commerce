import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() set products(value: any[]) {
      this._products = value.map(p => ({ ...p, showMenu: false }));
  }

  get products() {
    return this._products;
  }
  private _products: any[] = [];

  isFavorited: boolean = false;

  toggleFavorite(id: any): void {    
    console.log(id);
    
    this.isFavorited = true;
  }
}
