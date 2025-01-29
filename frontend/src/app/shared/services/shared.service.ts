import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

  constructor() { }

  public preventSpace(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
}
