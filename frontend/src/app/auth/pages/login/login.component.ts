import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private unsubscribe = new Subject<void>;

  constructor(public apiData: ApiDataService, private router: Router) {}

  protected email!: string;
  protected password!: string;
  protected loginError: boolean = false;

  protected login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiData.postLogin(loginData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {

        if (res.data.token) {
          sessionStorage.setItem("Session-Token", res.data.token);
          console.log("Olá, seja bem-vindo.");
          this.router.navigate([`/user/home`]); 
        } else { 
          console.log("Credencial inválida, revise os dados inseridos.");
          this.loginError = true;
        }
      },
      error: message => {
        
        console.log("Não foi possível processar sua requisição.");
      }
    })
  }
}
