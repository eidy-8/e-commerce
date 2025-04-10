import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private toastSubject = new Subject<any>();
  toastState$ = this.toastSubject.asObservable();

  show(toast: any) {
    this.toastSubject.next(toast);
  }
}
