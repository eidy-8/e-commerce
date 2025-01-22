import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected email!: string;
  protected password!: string;
  protected loginError: boolean = false;

  protected login() {
    if (this.email !== 'usuario@exemplo.com' || this.password !== 'senha123') {
      this.loginError = true;
    } else {
      this.loginError = false;
      console.log('login bem-sucedido.');
    }
  }
}
