import { Component, Input } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  active: boolean;
  imageUrl: string;
}

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent {
  @Input() products: Product[] = [];

  toggleStatus(product: Product): void {
    product.active = !product.active;
  }

  editProduct(id: number): void {
    console.log(`Editar produto: ${id}`);
  }

  deleteProduct(id: number): void {
    console.log(`Excluir produto: ${id}`);
  }
}
