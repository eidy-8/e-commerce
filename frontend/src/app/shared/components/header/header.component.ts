import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public isLogged: boolean = false;
  
    constructor(public authService: AuthService) {}
  
    async ngOnInit(): Promise<void> {
      this.isLogged = await this.authService.isAuthenticated();     
    }
}
