import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-public',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(public authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.isLogged = await this.authService.isAuthenticated();     
  }
}
