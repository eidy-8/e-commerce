import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  menuItems = ['Início', 'Sobre', 'Serviços', 'Contato', 'Blog', 'Login'];
}
