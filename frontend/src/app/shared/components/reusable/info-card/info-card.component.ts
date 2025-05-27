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
}
