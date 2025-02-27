import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header-sub-logged',
  templateUrl: './header-sub-logged.component.html',
  styleUrl: './header-sub-logged.component.css'
})
export class HeaderSubLoggedComponent {
  @Input() username: any;

  constructor(private authService: AuthService) {}

  protected logout() {
    this.authService.logout();

    window.location.reload();
  }
}
