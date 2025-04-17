import { Component, Input } from '@angular/core';

export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  active: boolean;
  imageUrl: string;
  sales: number;
  selected?: boolean;
  }

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent {
  @Input() products: Product[] = [];
  allSelected = false;

  toggleSelectAll() {
  this.allSelected = !this.allSelected;
  this.products.forEach(p => p.selected = this.allSelected);
  }

  onProductSelectionChange() {
  this.allSelected = this.products.every(p => p.selected);
  }

  pauseSelected() {
  this.products.filter(p => p.selected)
  .forEach(p => p.active = false);
  }

  activateSelected() {
  this.products.filter(p => p.selected)
  .forEach(p => p.active = true);
  }

  toggleProduct(p: Product) {
  p.active = !p.active;
  }

  editProduct(p: Product) {
  }

  viewProduct(p: Product) {
  }

  deleteProduct(p: Product) {
  }
}
