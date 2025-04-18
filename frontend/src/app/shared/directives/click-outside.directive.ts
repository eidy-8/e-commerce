import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output('appClickOutside') clickOutside = new EventEmitter<void>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    const clickedInside = this._elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
