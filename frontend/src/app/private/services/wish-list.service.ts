import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  protected urlWishList = `${Environment.ENV_WISHLIST}`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public getWishList(buyerId: string): Observable<any> {    
    return this.httpClient.get<any>(`${this.urlWishList}/${buyerId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  public postWishList(buyerId: string, productId: any, sellerId: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.urlWishList}/${buyerId}`,
      JSON.stringify({ productId, sellerId }),
      this.httpOptions
    )
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public deleteFromWishList(buyerId: string, productId: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlWishList}/${buyerId}`, { ...this.httpOptions, body: JSON.stringify(productId) })
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
