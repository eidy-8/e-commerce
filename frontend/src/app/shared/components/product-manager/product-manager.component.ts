import { Component, Input } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  active: boolean;
  imageUrl: string;
  sales: number;
  selected?: boolean;
  showMenu?: boolean;
}

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent {
  @Input() set products(value: Product[]) {
    this._products = value.map(p => ({ ...p, showMenu: false }));
  }
  get products() {
    return this._products;
  }
  private _products: Product[] = [];

  allSelected = false;

  blurPauseButton = true;
  blurActivateButton = true;
  blurExcludeButton = true;

  toggleSelectAll() {
    this.allSelected = !this.allSelected;
    this.products.forEach(p => p.selected = this.allSelected);

    const hasSelected = this.products.map(p => p.selected).some(selected => selected === true);

    if (hasSelected) {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false;
    } else {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false; 
    }
  }

  onProductSelectionChange() {    
    const hasSelected = this.products.map(p => p.selected).some(selected => selected === true);

    if (hasSelected) {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false;
    } else {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false; 
    }
    
    this.allSelected = this.products.every(p => p.selected);
  }

  pauseSelected() {
    const selectedProducts = this.products.filter(p => p.selected)
    this.products.filter(p => p.selected).forEach(p => p.active = false);

    for (let i = 0; i < selectedProducts.length; i++) {
      console.log(selectedProducts[i].id);
    }
  }

  activateSelected() {
    this.products.filter(p => p.selected).forEach(p => p.active = true);
  }

  excludeSelected() {
    this.products.filter(p => p.selected).forEach(p => p.active = true);
  }

  toggleProduct(p: Product) {
    p.active = !p.active;
  }

  editProduct(p: Product) {
    console.log(p.id);
  }

  viewProduct(p: Product) {
  }

  deleteProduct(p: Product) {
  }

  toggleMenu(p: Product) {
    (p as any).showMenu = !(p as any).showMenu;
  }
}
