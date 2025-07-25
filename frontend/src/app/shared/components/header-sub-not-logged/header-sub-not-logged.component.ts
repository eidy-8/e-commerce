import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sub-not-logged',
  templateUrl: './header-sub-not-logged.component.html',
  styleUrl: './header-sub-not-logged.component.css'
})
export class HeaderSubNotLoggedComponent {
  constructor(private router: Router) {}

  protected categoryOptions = [
    { name: 'Beleza', action: () =>     this.router.navigate([ '/category/1b30d362-085a-44a5-a0e6-c2dc9b969349' ]) },
    { name: 'Brinquedo', action: () =>  this.router.navigate([ '/category/9af6620e-2392-4ff9-a5f0-22b1f15b0bb6' ]) },
    { name: 'Comida', action: () =>     this.router.navigate([ '/category/4935a834-10ee-408c-b573-987ff8533c20' ]) },
    { name: 'Esporte', action: () =>    this.router.navigate([ '/category/9d41e1af-ece6-4e14-bf0a-8f7ef8c92980' ]) },
    { name: 'Limpeza', action: () =>    this.router.navigate([ '/category/5a806c73-d955-42a5-9db2-71c69fa2ad75' ]) },
    { name: 'Moda', action: () =>       this.router.navigate([ '/category/b4357830-ea29-4228-9990-add55a008ea9' ]) },
    { name: 'Móveis', action: () =>     this.router.navigate([ '/category/5d4872fc-b17e-4aa3-b5f7-2dc69f66f2c1' ]) },
    { name: 'Tecnologia', action: () => this.router.navigate([ '/category/e37a2ac8-f409-4e09-82f8-ce1616a4df36' ]) },
    { name: 'Veículos', action: () =>   this.router.navigate([ '/category/cb02e070-e621-474a-bd9b-be2b05a7b29d' ]) }
  ]

  protected redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  protected redirectToRegister() {
    this.router.navigate(['/auth/register'])
  }
}
