import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  total = 170.54;

  groupedOptions: any[] = [
    {
      id: '1',
      paymentmethod: 'Crédito'
    },
    {
      id: '2',
      paymentmethod: 'Pix'
    },
    {
      id: '3',
      paymentmethod: 'Boleto'
    },
    {
      id: '4',
      paymentmethod: 'Débito'
    }
  ];

  selectedMethod: string | null = null;

  selectMethod(id: string): void {
    this.selectedMethod = id;
  }

  aoo() {
    console.log(this.selectedMethod);
  }
}
