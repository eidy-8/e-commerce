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
  protected options = [
    { name: 'Minha conta', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Compras', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Vender', action: () => this.router.navigate([ '/user/new-product' ]) },
    { name: 'Anúncios', action: () => this.router.navigate([ '/user/my-products' ]) },
    { name: 'Sair', action: () => this.logout() }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  protected logout() {    
    this.authService.logout();

    window.location.reload();
  }
}
