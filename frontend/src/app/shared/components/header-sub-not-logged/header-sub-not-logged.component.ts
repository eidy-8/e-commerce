import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sub-not-logged',
  templateUrl: './header-sub-not-logged.component.html',
  styleUrl: './header-sub-not-logged.component.css'
})
export class HeaderSubNotLoggedComponent {
  constructor(private router: Router) {}

  protected redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  protected redirectToRegister() {
    this.router.navigate(['/auth/register'])
  }
}
