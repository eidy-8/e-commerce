import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent {
  @Input() fullScreen: boolean = false;
}
