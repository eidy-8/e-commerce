import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title = 'Título do Modal';
  @Input() primaryButton: { label: string, styleClass?: string, action?: () => void } = { label: 'Confirmar' };
  @Input() secondaryButton: { label: string, styleClass?: string, action?: () => void } = { label: 'Cancelar' };

  @Output() close = new EventEmitter<void>();

  private _isOpen = false; 

  get isOpen(): boolean {
    return this._isOpen; 
  }

  open(): void {
    this._isOpen = true;
  }

  closeModal(): void {
    this._isOpen = false;
    this.close.emit(); 
  }

  handlePrimaryClick(): void {
    if (this.primaryButton?.action) {
      this.primaryButton.action();
    }
  }

  handleSecondaryClick(): void {
    if (this.secondaryButton?.action) {
      this.secondaryButton.action();
    } else {
      this.closeModal();
    }
  }
}
