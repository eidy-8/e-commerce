import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  protected urlOrder = `${Environment.ENV_ORDER}`;
      
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public getOrder(buyerId?: string): Observable<any> {  
    if (buyerId) {
      return this.httpClient.get<any>(`${this.urlOrder}/${buyerId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
    }  

    return this.httpClient.get<any>(`${this.urlOrder}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public postOrder(orderData: any): Observable<any> {
    console.log(JSON.stringify(orderData));
    
    return this.httpClient.post<any>(this.urlOrder, JSON.stringify(orderData), this.httpOptions)
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
