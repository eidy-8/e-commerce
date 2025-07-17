import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  protected urlPayment = `${Environment.ENV_PAYMENT}`;
    
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public getPayment(paymentId: string): Observable<any> {    
    return this.httpClient.get<any>(`${this.urlPayment}/${paymentId}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public postPayment(paytypeData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.urlPayment}`, JSON.stringify(paytypeData), this.httpOptions)
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
