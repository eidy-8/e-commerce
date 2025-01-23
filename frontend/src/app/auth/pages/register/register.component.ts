import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected email!: string;
  protected name!: string;
  protected password!: string;
  protected registerError: boolean = false;

  protected register() {    
    if (this.email !== 'usuario@exemplo.com' || this.password !== 'senha123') {
      this.registerError = true;
    } else {
      this.registerError = false;
      console.log('registro bem-sucedido.');
    }
  }
}
