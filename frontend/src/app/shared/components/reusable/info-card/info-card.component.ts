import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() title: string = ''; 
  @Input() description?: string; 
  @Input() buttonLabel?: string; 
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info'; 
  @Output() buttonClicked = new EventEmitter<void>(); 

  onButtonClick(): void {
    this.buttonClicked.emit();
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'fa fa-check-circle';
      case 'error': return 'fa fa-times-circle';
      case 'info': return 'fa fa-info-circle';
      case 'warning': return 'fa fa-exclamation-circle';
      default: return '';
    }
  }
}
