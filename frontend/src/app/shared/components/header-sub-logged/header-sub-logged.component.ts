import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sub-logged',
  templateUrl: './header-sub-logged.component.html',
  styleUrl: './header-sub-logged.component.css'
})
export class HeaderSubLoggedComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  protected logout() {
    this.authService.logout();

    window.location.reload();
  }
}
