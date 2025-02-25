import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        const token = sessionStorage.getItem('Session-Token');

        if ( token ) {

            const modifiedReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
      
            return next.handle(modifiedReq);
      
          } else {
      
            return next.handle(req);
          };
    }
}
