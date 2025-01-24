import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from './api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private unsubscribe = new Subject<void>;
  private authenticated = false;

  constructor(public apidata: ApiDataService) { }

  isAuthenticated(): Promise<boolean> {
    const token = sessionStorage.getItem('Session-Token');
    const req = { token };

    return new Promise((resolve) => {
      this.apidata.verifyToken(req)
        .pipe(
          takeUntil(this.unsubscribe)
        ).subscribe({
          next: res => {
            this.authenticated = res.valid === true;
            resolve(this.authenticated);
          },
          error: () => {
            console.log("Não foi possível processar sua requisição");
            resolve(false);
          }
        });
    });
  }

  logout(): void {
    sessionStorage.removeItem('Session-Token');
  }
}
