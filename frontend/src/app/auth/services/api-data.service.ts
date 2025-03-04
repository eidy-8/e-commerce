import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  protected urlLogin = `${Environment.ENV_LOGIN}`;
  protected urlRegister = `${Environment.ENV_REGISTER}`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public postLogin(loginData: any): Observable<any> {
    return this.httpClient.post<any>(this.urlLogin, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  public postUser(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.urlRegister, JSON.stringify(userData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  public verifyToken(token: any): Observable<any> {
    return this.httpClient.post<any>(`${this.urlLogin}/verify-token`, JSON.stringify(token), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };
  
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
