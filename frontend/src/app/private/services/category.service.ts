import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected urlCategory = `${Environment.ENV_CATEGORY}`;
    
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public getCategory(id: any): Observable<any> {
    if (id) {
      return this.httpClient.get<any>(`${this.urlCategory}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    } else {
      return this.httpClient.get<any>(`${this.urlCategory}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
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
