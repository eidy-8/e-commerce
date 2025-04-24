import { Component, Input } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isactive: string;
  imageurl: string;
  sale: number;
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
      this.blurExcludeButton = true;
      this.blurActivateButton = true;
      this.blurPauseButton = true; 
    }
  }

  onProductSelectionChange() {    
    const hasSelected = this.products.map(p => p.selected).some(selected => selected === true);

    console.log(hasSelected);

    if (hasSelected) {
      this.blurExcludeButton = false;
      this.blurActivateButton = false;
      this.blurPauseButton = false;
    } else {
      this.blurExcludeButton = true;
      this.blurActivateButton = true;
      this.blurPauseButton = true; 
    }
    
    this.allSelected = this.products.every(p => p.selected);
  }

  pauseSelected() {
    const selectedProducts = this.products.filter(p => p.selected)
    this.products.filter(p => p.selected).forEach(p => p.isactive = 'F');

    for (let i = 0; i < selectedProducts.length; i++) {
      console.log(selectedProducts[i].id);
    }
  }

  activateSelected() {
    this.products.filter(p => p.selected).forEach(p => p.isactive = 'T');
  }

  excludeSelected() {
    this.products.filter(p => p.selected).forEach(p => p.isactive = 'T');
  }

  toggleProduct(p: Product) {
    console.log(p.isactive);
    
    if (p.isactive == 'T') {
      p.isactive = 'F';
    } else {
      p.isactive = 'T'
    }
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
