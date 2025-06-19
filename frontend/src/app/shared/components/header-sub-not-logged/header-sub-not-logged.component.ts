import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sub-not-logged',
  templateUrl: './header-sub-not-logged.component.html',
  styleUrl: './header-sub-not-logged.component.css'
})
export class HeaderSubNotLoggedComponent {
  constructor(private router: Router) {}

  protected categoryOptions = [
    { name: 'Beleza', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Brinquedo', action: () => this.router.navigate([ '/user/my-products' ]) },
    { name: 'Comida', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Esporte', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Limpeza', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Moda', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Móveis', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Tecnologia', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Veículos', action: () => this.router.navigate([ '/user/new-product' ]) }
  ]

  protected redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  protected redirectToRegister() {
    this.router.navigate(['/auth/register'])
  }
}
