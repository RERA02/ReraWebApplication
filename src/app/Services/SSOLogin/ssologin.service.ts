// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { SSOLandingDataDataModel, SSOLoginDataModel, UpdateStudentDetailsModel, ValidateUserRightsModel } from '../../Models/SSOLoginDataModel';
// import { AppsettingService } from '../../Common/appsetting.service';
// import { UserRequestModel, UserSearchModel } from '../../Models/UserRequestDataModel';

// @Injectable({
//   providedIn: 'root'
// })
// export class SSOLoginService {
//   //readonly APIUrl = this.environment.apiUrls.BaseURL + "Authentication";
//   //private apiUrl = `${this.environment.apiUrls.BaseURL}Authentication`; // Adjust your API URL here

//   readonly APIUrl = this.appsettingConfig.ssoAuthenticationURL + "Authentication";
//   private apiUrl = `${this.appsettingConfig.ssoAuthenticationURL}Authentication`; // Adjust your API URL here

//   private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   public currentUser: Observable<any> = this.currentUserSubject.asObservable();
//   public validateUserRightsModel = new ValidateUserRightsModel();

//   constructor(private http: HttpClient, private appsettingConfig: AppsettingService) { }
//   extractData(res: Response) {
//     return res;
//   }
//   handleErrorObservable(error: Response | any) {
//     return throwError(error);
//   }

//   public async GetSSOUserDetails(SearchRecordID: string) {
//     const headers = { 'content-type': 'application/json' }
//     return await this.http.get(this.APIUrl + '/GetSSOUserDetails/' + SearchRecordID, { 'headers': headers, observe: 'response' })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   public async SaveData(request: UserRequestModel) {
//     const headers = { 'content-type': 'application/json' }
//     const body = JSON.stringify(request);
//     return await this.http.post(this.APIUrl + '/SaveData/', body, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }  

//   public async Login(SSOID: string, Password: string) {
//     const headers = { 'content-type': 'application/json' }
//     return await this.http.get(this.APIUrl + '/Login/' + SSOID + "/" + Password, { 'headers': headers, observe: 'response' })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   login(SSOID: string, Password: string): Observable<any> {
    
//     const headers = { 'content-type': 'application/json' }
//     return this.http.get<any>(this.apiUrl + '/Login/' + SSOID + "/" + Password, { 'headers': headers, observe: 'response' })
//       .pipe(
//         tap(response => {
//           // Store the token in localStorage or sessionStorage
//           const token = response.headers.get('x-authtoken');
//           if (token) {
//             localStorage.setItem('authtoken', token);
//             this.currentUserSubject.next(token);
//           }
//         })
//       );
//   }

//   // Check if the user is logged in by checking the token
//   isLoggedIn(): ValidateUserRightsModel {

//     if (!!localStorage.getItem('authtoken')) {
//       var result = JSON.parse(String(localStorage.getItem('SSOLoginUser')));

//       this.validateUserRightsModel.IsValidToken = true;
//       this.validateUserRightsModel.SSOID = result.SSOID;
//       this.validateUserRightsModel.RoleID = result.RoleID;
//       this.validateUserRightsModel.SearchRecordID = result.SearchRecordID;
//     }
//     //return !!localStorage.getItem('authtoken');
//     return this.validateUserRightsModel;
//   }

//   //public async ValidateUserRights(SSOID: string, RoleID: number, SearchRecordID: string, pageURL: string) {
//   //  const headers = { 'content-type': 'application/json' }
//   //  return await this.http.get(this.APIUrl + '/ValidateUserRights/' + SSOID + "/" + RoleID + "/" + SearchRecordID + "/" + pageURL, { 'headers': headers, observe: 'response' })
//   //    .pipe(
//   //      catchError(this.handleErrorObservable)
//   //    ).toPromise();
//   //}

//   public async ValidateUserRights(request: ValidateUserRightsModel) {
//     const headers = { 'content-type': 'application/json' }
//     const body = JSON.stringify(request);
//     return await this.http.post(this.APIUrl + '/ValidateUserRights/', body, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   // Log out by removing the token
//   logout(): void {
//     localStorage.removeItem('authtoken');
//     this.currentUserSubject.next(null);
//   }

//   public async GetSSOUserLogionDetails(sSOLandingDataDataModel: SSOLandingDataDataModel) {
//     const headers = { 'content-type': 'application/json' }
//     const body = JSON.stringify(sSOLandingDataDataModel);
//     return await this.http.post(this.APIUrl + '/GetSSOUserLogionDetails/', body, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }
//   public async CheckMappingSSOID(SSOID: string) {
//     const headers = { 'content-type': 'application/json' }
//     return await this.http.get(this.APIUrl + '/CheckMappingSSOID/' + SSOID, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }
  
//   public async UpdateStudentUserType(request: UpdateStudentDetailsModel) {
//     const headers = { 'content-type': 'application/json' }
//     const body = JSON.stringify(request);
//     return await this.http.post(this.APIUrl + '/UpdateStudentUserType/', body, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   //#endregion User Request Data

//   public async StudentLogin(SSOID: string) {

//     const headers = { 'content-type': 'application/json' }
//     return await this.http.get(this.APIUrl + '/StudentLogin/' + SSOID, { 'headers': headers, observe: 'response' })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   //Start  User Request Data
//   public async GetUserRequestList(UserId: number, RoleId: number) {
//     const headers = { 'content-type': 'application/json' }
    
//     return await this.http.post(this.APIUrl + '/GetUserRequestList/' + UserId + '/' + RoleId, { 'headers': headers, observe: 'response' })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }

//   public async SaveUserRequestData(request: UserRequestModel) {
//     const headers = { 'content-type': 'application/json' }
//     const body = JSON.stringify(request);
//     return await this.http.post(this.APIUrl + '/SaveUserRequestData/', body, { 'headers': headers })
//       .pipe(
//         catchError(this.handleErrorObservable)
//       ).toPromise();
//   }
//   //End User Request Data
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SSOLandingDataDataModel, SSOLoginDataModel, UpdateStudentDetailsModel, ValidateUserRightsModel } from '../../Models/SSOLoginDataModel';
import { AppsettingService } from '../../Common/appsetting.service';
import { SSO_UserSearchModel, UserRequestModel, UserSearchModel } from '../../Models/UserRequestDataModel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SSOLoginService {
  //readonly APIUrl = this.environment.apiUrls.BaseURL + "Authentication";
  //private apiUrl = `${this.environment.apiUrls.BaseURL}Authentication`; // Adjust your API URL here

  readonly APIUrl = this.appsettingConfig.ssoAuthenticationURL + "Authentication";
  private apiUrl = `${this.appsettingConfig.ssoAuthenticationURL}Authentication`; // Adjust your API URL here

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();
  public validateUserRightsModel = new ValidateUserRightsModel();

  constructor(private http: HttpClient, private appsettingConfig: AppsettingService, private toastr: ToastrService) { }
  extractData(res: Response) {
    return res;
  }
  handleErrorObservable(error: Response | any) {
    return throwError(error);
  }

  

  public async SaveData(request: UserRequestModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + '/SaveData/', body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }  

  

  LoginWeb(request: SSO_UserSearchModel): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(request); // Ensure you stringify the request object

    return this.http.post<any>(this.apiUrl + '/Login', body, {
      headers: headers,
      observe: 'response'
    })
      .pipe(
        tap(response => {
          // Store the token in localStorage or sessionStorage
          const token = response.headers.get('x-authtoken'); // Use get() to extract headers
          if (token) {
            localStorage.setItem('authtoken', token); // Store token in localStorage
            this.currentUserSubject.next(token); // Update currentUserSubject with token
          }
        })
      );
  }


  // Check if the user is logged in by checking the token
  isLoggedIn(): ValidateUserRightsModel {
    debugger;
    const getlocalStorage = localStorage.getItem('authtoken');
    /*console.log('authtoken',getlocalStorage);*/
    if (localStorage.getItem('authtoken')) {
      //var result = JSON.parse(String(localStorage.getItem('SSOLoginUser')));

      const item = localStorage.getItem('SSOLoginUser');
      const result = item ? JSON.parse(item) : null;
      this.validateUserRightsModel.IsValidToken = true;
      this.validateUserRightsModel.SSOID = result.SSOID;
      this.validateUserRightsModel.RoleID = result.RoleID;
      this.validateUserRightsModel.SearchRecordID = result.SearchRecordID;
    } else {
      console.log('Failed to load user localStorage.');
    }
    //return !!localStorage.getItem('authtoken');
    return this.validateUserRightsModel;
  }



  //isLoggedIn(): boolean {
  //  return !!localStorage.getItem('authtoken');
  //}
  //public async ValidateUserRights(SSOID: string, RoleID: number, SearchRecordID: string, pageURL: string) {
  //  const headers = { 'content-type': 'application/json' }
  //  return await this.http.get(this.APIUrl + '/ValidateUserRights/' + SSOID + "/" + RoleID + "/" + SearchRecordID + "/" + pageURL, { 'headers': headers, observe: 'response' })
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}

  public async ValidateUserRights(request: ValidateUserRightsModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + '/ValidateUserRights/', body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  // Log out by removing the token
  //logout(): void {
  //  localStorage.removeItem('authtoken');
  //  this.currentUserSubject.next(null);
  //}

  public async GetSSOUserLogionDetails(sSOLandingDataDataModel: SSOLandingDataDataModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(sSOLandingDataDataModel);
    return await this.http.post(this.APIUrl + '/GetSSOUserLogionDetails/', body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async CheckMappingSSOID(SSOID: string) {
    const headers = { 'content-type': 'application/json' }
    return await this.http.get(this.APIUrl + '/CheckMappingSSOID/' + SSOID, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  
  public async UpdateStudentUserType(request: UpdateStudentDetailsModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + '/UpdateStudentUserType/', body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //#endregion User Request Data

  public async StudentLogin(SSOID: string) {
    const headers = { 'content-type': 'application/json' }
    return await this.http.get(this.APIUrl + '/StudentLogin/' + SSOID, { 'headers': headers, observe: 'response' })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async GetUserRequestList(SSOId: string, ActionType: string) {
    const headers = { 'content-type': 'application/json' }   
    return await this.http.get(`${this.APIUrl}/GetUserRequestList/${SSOId}/${ActionType}`, { 'headers': headers, observe: 'response' })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  //Start  User Request Data
  public async SaveUserRequestData(request: UserRequestModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + '/SaveUserRequestData/', body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //End User Request Data






  public async GetSSOUserDetails(SearchRecordID: string) {
    console.log(this.apiUrl);
    const headers = { 'content-type': 'application/json' }
    return await this.http.get(this.apiUrl + '/GetSSOUserDetails/' + SearchRecordID, { 'headers': headers, observe: 'response' })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  //public async GetSSOUserDetails(SearchRecordID: string) {
  //  console.log(this.apiUrl);
  //  const headers = { 'content-type': 'application/json' }
  //  return await this.http.get("https://rajemployment.rajasthan.gov.in/api/Authentication" + '/GetSSOUserDetails/' + SearchRecordID, { 'headers': headers, observe: 'response' })
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}



  public async GetUserDetail(userId: number, ActionName: string) {
    debugger;
    const headers = { 'content-type': 'application/json' }
    
    return await this.http.get(`${this.APIUrl}/GetUserDetail/${userId}/${ActionName}`, { 'headers': headers, observe: 'response' })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //public async GetUserDetail(userId: number, ActionName: string) {
  //  const headers = { 'content-type': 'application/json' }

  //  return await this.http.get(`https://rajemployment.rajasthan.gov.in/api/Authentication/GetUserDetail/${userId}/${ActionName}`, { 'headers': headers, observe: 'response' })
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}


  public async Login(SSOID: string, Password: string) {
    debugger;
    //with async
    const headers = { 'content-type': 'application/json' }
    return await this.http.get(this.APIUrl + '/Login/' + SSOID + "/" + Password, { 'headers': headers, observe: 'response' })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  login(SSOID: string, Password: string): Observable<any> {
    //without async
    debugger;
    const headers = { 'content-type': 'application/json' }
    return this.http.get<any>(this.apiUrl + '/Login/' + SSOID + "/" + Password, { 'headers': headers, observe: 'response' })
      .pipe(
        tap(response => {
          // Store the token in localStorage or sessionStorage
          const token = response.headers.get('x-authtoken');
          if (token) {
            localStorage.setItem('authtoken', token);
            this.currentUserSubject.next(token);
          }
        })
      );
  }

}
