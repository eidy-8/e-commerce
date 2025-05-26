import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() title: string = 'Título do card';
  @Input() description: string = 'Descrição do card.';
  @Input() buttonLabel: string = 'Ação';
  @Input() buttonColor: string = '#28a745'; // Verde padrão

  @Output() buttonClicked = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
