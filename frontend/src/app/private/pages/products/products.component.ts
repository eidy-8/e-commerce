import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/components/reusable/product-manager/product-manager.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  listaDeProdutos: Product[] = [];

  ngOnInit(): void {
    this.listaDeProdutos = [
      {
        id: 1001,
        code: '42201621',
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1,
        selected: true
      },
      {
        id: 1001,
        code: '42201621',
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1,
        selected: false
      },
      {
        id: 1001,
        code: '42201621',
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1,
        selected: true
      }
    ]
  }
}
