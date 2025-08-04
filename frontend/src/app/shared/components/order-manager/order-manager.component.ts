import { Component, Input, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../../private/services/product.service';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.css'
})
export class OrderManagerComponent {
  @Input() set orders(value: any) {
    console.log(value);
    this.ordersList = value.orders;
  }
  
  ordersProducts: any;

  ordersList: any;
  private unsubscribe = new Subject<void>;
  
  constructor(public productService: ProductService, private toasterService: ToasterService, private router: Router) {}

  formatOrderDate(dateString: string): string {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const date = new Date(dateString);
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    return `${dia} de ${mes}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
