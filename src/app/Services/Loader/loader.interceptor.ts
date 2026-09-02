// loader.interceptor.ts
//import { Injectable } from '@angular/core';
//import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
//import { LoaderService } from './loader.service';
//import { Observable, of } from 'rxjs';
//import { finalize } from 'rxjs/operators';
//import { SSOLoginDataModel } from '../../Models/SSOLoginDataModel';
//import { SweetAlert2 } from '../../Common/SweetAlert2';
//import { CookieService } from 'ngx-cookie-service';
//import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
//import { GlobalConstants } from '../../Common/GlobalConstants';

//@Injectable()
//export class LoaderInterceptor implements HttpInterceptor {
//  public sSOLoginDataModel = new SSOLoginDataModel();
//  constructor(private router: Router, private cookieService: CookieService, private loaderService: LoaderService, private Swal2: SweetAlert2, private toastr: ToastrService) {
//    this.sSOLoginDataModel = JSON.parse(String(localStorage.getItem('SSOLoginUser')));
//  }

//  async Logout() {
//    console.log('LoaderInterceptor');
//    sessionStorage.removeItem('userid');
//    sessionStorage.removeItem('LoginID');
//    sessionStorage.clear();
//    localStorage.clear();
//    this.cookieService.set('LoginStatus', "");
//    this.cookieService.deleteAll();
//    try {
//      this.router.navigate(['/login']);
//    }
//    catch (Ex) {
//      console.log(Ex);
//    }
//    finally {
//      await setTimeout(() => {
//        // this.loaderService.requestEnded();
//      }, 2);
//    }


//  }

//  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//    //
//    //if (this.sSOLoginDataModel && this.sSOLoginDataModel.EndTermID !== this.sSOLoginDataModel.EndTermID_Session) {
//    //  let isBlocked = !GlobalConstants.ServerNotBlockedURL
//    //    .some(x => x.toLowerCase().trim() === req.url.toLowerCase().trim());

//    //  if (isBlocked) {
//    //    console.warn('You only work with in active session');
//    //    //this.toastr.warning(`You only work with in active session (${this.sSOLoginDataModel.EndTermID_Session})`);
//    //    return of(new HttpResponse({ status: 401, body: { message: 'Unauthorized' } }));
//    //  }

//    //}

//    //// Check if the request has the 'no-loader' header
//    if (req.headers.has('no-loader')) {
//      // If the header exists, skip the loader logic
//      return next.handle(req);
//    }

//    // Show loader when a request is made
//    this.loaderService.show();

//    return next.handle(req).pipe(
//      finalize(() => {
//        // Hide loader after the response is received or an error occurs
//        setTimeout(() => {
//          this.loaderService.hide();
//        }, .500);

//      })
//    );
//  }
//}

// loader.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check if the request has the 'no-loader' header
    if (req.headers.has('no-loader')) {
      // If the header exists, skip the loader logic
      return next.handle(req);
    }

    // Show loader when a request is made
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        // Hide loader after the response is received or an error occurs
        setTimeout(() => {
          this.loaderService.hide();
        }, .500);

      })
    );
  }
}
