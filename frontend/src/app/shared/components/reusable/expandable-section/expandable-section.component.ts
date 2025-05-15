import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expandable-section',
  templateUrl: './expandable-section.component.html',
  styleUrl: './expandable-section.component.css'
})
export class ExpandableSectionComponent {
  @Input() title: string = ''; 
  @Input() value: string = '';
  @Output() confirm = new EventEmitter<void>(); 

  @ViewChild('expandableSection') expandableSection!: ElementRef;

  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      setTimeout(() => {
        this.expandableSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }

  onCancel(): void {
    this.isExpanded = false;
  }

  onConfirm(): void {
    this.confirm.emit(); 
  }
}
