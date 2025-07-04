import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';
import { MethodsService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  private unsubscribe = new Subject<void>;
  protected email!: string;
  protected name!: string;
  protected profileImage!: string;
  protected password!: string;
  protected password2!: string;
  protected showPassword: boolean = false;

  protected registerError: boolean = false;
  protected profileImageError: boolean = false;
  protected emailRegisterError: boolean = false;
  protected passwordRegisterError: boolean = false;
  protected errorMessage!: string;

  constructor(public apiData: ApiDataService, private router: Router, public sharedMethod: MethodsService) {}

  @HostListener('document:keydown.enter', ['$event'])
    handleEnter(event: KeyboardEvent) {
      this.register();
  }
  
  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected register() {     
    if (this.email == undefined) {      
      this.errorMessage = "Digite e-mail.";
      this.emailRegisterError = true;
    } else if (this.name == undefined) {
      this.errorMessage = "Digite um nome."
      this.registerError = true;
    } else if (this.profileImage == undefined) {
      this.errorMessage = "Insira uma imagem de perfil.";
      this.profileImageError = true;
    } else if (this.password == undefined || this.password.length < 8) {
      this.errorMessage = "Digite uma senha segura de no mínimo 8 digitos."
      this.passwordRegisterError = true;
    } else if (!this.validateEmail(this.email)) {
      this.errorMessage = "Insira um e-mail válido.";
      this.emailRegisterError = true;
    } else if (this.password != this.password2) {
      this.errorMessage = "As senhas não conferem.";
      this.passwordRegisterError = true;
    } else {
      const registerData = {
        username: this.name,
        email: this.email,
        password: this.password,
        imageurl: this.profileImage
      }

      console.log(registerData);
      
  
      this.apiData.postUser(registerData).pipe( takeUntil( this.unsubscribe ) ).subscribe({
        next: res => {
          console.log(res.message);
          this.router.navigate(['auth/login']);
        },
        error: error => {
          console.log(error);
          this.errorMessage = error.message;
          this.registerError = true;
          this.emailRegisterError = true;
          this.passwordRegisterError = true;
          this.profileImageError = true;
        }
      });
    }
  };

  protected validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
