import { Component, Input, OnInit } from '@angular/core';
import { ToasterData } from '../../../interface/interface';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit {
  toasts: ToasterData[] = [];

  constructor(private toastService: ToasterService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), 3000);
    });
  }

  removeToast(toast: ToasterData) {
    this.toasts = this.toasts.filter(t => t !== toast);
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
