import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Título do Modal';
  
  @Input() primaryButton: { label: string, styleClass?: string, action?: () => void } = { label: 'Confirmar' };
  @Input() secondaryButton: { label: string, styleClass?: string, action?: () => void } = { label: 'Cancelar' };

  handlePrimaryClick() {
    if (this.primaryButton?.action) this.primaryButton.action();
  }

  handleSecondaryClick() {
    if (this.secondaryButton?.action) this.secondaryButton.action();
  }
}
