import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expandable-section',
  templateUrl: './expandable-section.component.html',
  styleUrl: './expandable-section.component.css'
})
export class ExpandableSectionComponent {
  @Input() title: string = ''; 
  @Input() value: string = '';
  @Input() isExpanded: boolean = false;
  @Output() confirm = new EventEmitter<void>(); 
  @Output() cancel = new EventEmitter<void>(); 
  @Output() toggle = new EventEmitter<boolean>();

  @ViewChild('expandableSection') expandableSection!: ElementRef;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.toggle.emit(this.isExpanded);

    if (this.isExpanded) {
      setTimeout(() => {
        this.expandableSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }

  onCancel(): void {
    this.cancel.emit(); 
  }

  onConfirm(): void {
    this.confirm.emit(); 
  }
}
