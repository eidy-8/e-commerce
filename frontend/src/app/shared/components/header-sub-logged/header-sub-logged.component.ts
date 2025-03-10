import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header-sub-logged',
  templateUrl: './header-sub-logged.component.html',
  styleUrl: './header-sub-logged.component.css'
})
export class HeaderSubLoggedComponent {
  @Input() username: any;
  protected options = [
    { name: 'Minha conta', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Compras', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Vender', link: 'https://github.com/eidy-8/postgreAnotacao' },
    { name: 'Sair', action: () => this.logout() }
  ];

  constructor(private authService: AuthService) {}

  protected logout() {
    console.log("logout");
    
    this.authService.logout();

    window.location.reload();
  }
}
