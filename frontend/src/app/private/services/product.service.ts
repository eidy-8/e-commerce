import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  protected urlProduct = `${Environment.ENV_PRODUCT}`;
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  public getProduct(searchTerm: string = '', page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
    return this.httpClient.get<any>(this.urlProduct, { params })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  public postProduct(productData: any): Observable<any> {
    return this.httpClient.post<any>(this.urlProduct, JSON.stringify(productData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public putProduct(productUpdate: any, product_id: any): Observable<any> {
    return this.httpClient.put<any>(`${this.urlProduct}/${product_id}`, JSON.stringify(productUpdate), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public deleteProduct(product_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlProduct}/${product_id}`)
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
