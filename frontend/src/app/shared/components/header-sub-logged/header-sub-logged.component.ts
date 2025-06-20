import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sub-logged',
  templateUrl: './header-sub-logged.component.html',
  styleUrl: './header-sub-logged.component.css'
})
export class HeaderSubLoggedComponent {
  @Input() text: any;
  @Input() img: any;
  protected userOptions = [
    { name: 'Minha conta', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Compras', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Vender', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Anúncios', action: () => this.router.navigate([ '/user/my-products' ]) },
    { name: 'Sair', action: () => this.logout() }
  ];

  protected categoryOptions = [
    { name: 'Beleza', action: () => this.router.navigate([ '/category/1b30d362-085a-44a5-a0e6-c2dc9b969349' ]) },
    { name: 'Brinquedo', action: () => this.router.navigate([ '/user/my-products' ]) },
    { name: 'Comida', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Esporte', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Limpeza', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Moda', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Móveis', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Tecnologia', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Veículos', action: () => this.router.navigate([ '/user/new-product' ]) }
  ]

  constructor(private authService: AuthService, private router: Router) {}

  protected logout() {    
    this.authService.logout();

    window.location.reload();
  }
}
