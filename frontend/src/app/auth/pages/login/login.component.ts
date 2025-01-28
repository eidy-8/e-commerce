import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { MethodsService } from '../../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private unsubscribe = new Subject<void>;

  constructor(public apiData: ApiDataService, private router: Router, public sharedMethod: MethodsService) {}

  protected email!: string;
  protected password!: string;
  protected loginError: boolean = false;

  protected errorMessage!: string;

  protected login() {
    if (this.email == undefined || this.password == undefined) {      
      this.errorMessage = "Preencha todos os campos.";
      this.loginError = true;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiData.postLogin(loginData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        sessionStorage.setItem("Session-Token", res.data.token);
        this.router.navigate([`/user/home`]); 
      },
      error: error => {
        this.errorMessage = error.message;
        this.loginError = true;
      }
    })
  }
}
