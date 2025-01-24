import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private unsubscribe = new Subject<void>;

  constructor(public apiData: ApiDataService, private router: Router) {}

  protected email!: string;
  protected name!: string;
  protected password!: string;
  protected password2!: string;
  protected showPassword: boolean = false;

  protected registerError: boolean = false;
  protected emailRegisterError: boolean = false;
  protected passwordRegisterError: boolean = false;
  
  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected register() {    
    if (!this.validateEmail(this.email)) {
      console.log("Insira um e-mail válido.");
      this.emailRegisterError = true;
    } else if (this.password != this.password2) {
      console.log("As senhas não conferem.");
      this.passwordRegisterError = true;
    } else {
      const registerData = {
        username: this.name,
        email: this.email,
        password: this.password
      }
  
      this.apiData.postUser(registerData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          console.log(res.message);
          this.router.navigate(['auth/login']);
        },
        error: error => {
          console.log(error);
          this.registerError = true;
          this.emailRegisterError = true;
          this.passwordRegisterError = true;
        }
      });
    }
  };

  protected validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
}
