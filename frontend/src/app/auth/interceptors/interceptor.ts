import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../../shared/services/loading.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('Session-Token');

    this.loadingService.show();

    let modifiedReq = req;

    if (token) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(modifiedReq).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
