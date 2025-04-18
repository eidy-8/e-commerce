import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/components/product-manager/product-manager.component';

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
        id: "892f7e1a-0586-42a6-a8e2-e8ffde7cd8b1",
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1
      },
      {
        id: "892f7e1a-0586-42a6-a8e2-e8ffde7cd8b2",
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1
      },
      {
        id: "892f7e1a-0586-42a6-a8e2-e8ffde7cd8b3",
        name: 'Fone de Ouvido Bluetooth',
        price: 199.99,
        quantity: 12,
        active: true,
        imageUrl: 'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png',
        sales: 1
      }
    ]
  }
}
