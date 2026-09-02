import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const apiKey = 'MySuperSecretApiKey_123';

    const clonedRequest = req.clone({
      setHeaders: {
        'X-API-KEY': apiKey
      }
    });

    return next.handle(clonedRequest);
  }
}
