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
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png'
      },
      {
        id: 1002,
        name: 'Mouse Gamer RGB',
        price: 149.5,
        quantity: 25,
        active: false,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png'
      },
      {
        id: 1003,
        name: 'Notebook i7 16GB RAM',
        price: 4299.9,
        quantity: 5,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png'
      }
    ]
  }
}
