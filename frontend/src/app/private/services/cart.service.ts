import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  protected urlCart = `${Environment.ENV_CART}`;
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    constructor(private httpClient: HttpClient) { }
  
    public getCart(buyerId: string): Observable<any> {    
      return this.httpClient.get<any>(`${this.urlCart}/${buyerId}`)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }
  
    public postCart(buyerId: string, productId: any): Observable<any> {
      return this.httpClient.post<any>(`${this.urlCart}/${buyerId}`, JSON.stringify(productId), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    public deleteFromCart(buyerId: string, productId: any): Observable<any> {
      return this.httpClient.delete<any>(`${this.urlCart}/${buyerId}`, { ...this.httpOptions, body: JSON.stringify(productId) })
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    private handleError(error: HttpErrorResponse) {
      let errorMessage = '';
    
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
        }
      }
    
      console.error('Erro capturado pelo handleError:', error);
    
      return throwError(() => ({
        status: error.status, 
        message: errorMessage, 
        fullError: error 
      }));
    }
}
