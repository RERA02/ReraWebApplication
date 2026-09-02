import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppsettingService } from '../../Common/appsetting.service';
import { catchError, Observable, throwError } from 'rxjs';
//import { SchemeDataModel } from '../../Models/OTRJanAadharDetailModel';
//import { SchemeDataModelsambhal } from '../../Models/OTRJanAadharDetailModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplySchemeService {

  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "ApplyScheme";
  readonly headersOptions: any;
  constructor(private http: HttpClient, private appsettingConfig: AppsettingService) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('authtoken')
      })
    };
  }

  handleErrorObservable(error: Response | any) {
    return throwError(error);
  }



  //FetchEmployerList
  public async FetchEmployerList(District: string, City: string) {
    return await this.http.get(`${this.APIUrl}/FetchEmployerList/${District}/${City}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  //CheckIsBenefitsAlreadyTaken
  public async CheckIsBenefitsAlreadyTaken(JanAadhaarNo: string, AadharNo: string,govtSchemeId:number) {
    return await this.http.get(`${this.APIUrl}/CheckIsBenefitsAlreadyTaken/${JanAadhaarNo}/${AadharNo}/${govtSchemeId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  ////SaveSchemeData
  //public async SaveSchemeData(request: SchemeDataModel) {
  //  debugger
  //  var body = JSON.stringify(request);
  //  return await this.http.post(`${this.APIUrl}/SaveSchemeData`, body, this.headersOptions)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}

  //SaveSchemeDataSambal
  //public async SaveSchemeDataSambal(request: SchemeDataModelsambhal) {
  //  debugger;
  //  var body = JSON.stringify(request);
  //  return await this.http.post(`${this.APIUrl}/SaveSchemeDataSambal`, body, this.headersOptions)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}


  //RevertBackToAssociateUser
  //public async RevertBackToAssociateUser(request: SchemeDataModel) {
  //  debugger;
  //  var body = JSON.stringify(request);
  //  return await this.http.post(`${this.APIUrl}/RevertBackToAssociateUser`, body, this.headersOptions)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.APIUrl + '/UploadSchemeDocument', formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  public async GetDownloadFile(Userid: Number ) {
    return await this.http.post(`${this.APIUrl}/GetDownloadFile/${Userid}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async AlreadyApplyedUser(UserId: Number) {
    return await this.http.post(`${this.APIUrl}/AlreadyApplyedUser/${UserId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  // public async SambhalYojana_CheckMemberEligibility(UserId: Number) {
  //   return await this.http.post(`${this.APIUrl}/SambhalYojana_CheckMemberEligibility/${UserId}`, this.headersOptions)
  //     .pipe(
  //       catchError(this.handleErrorObservable)
  //     ).toPromise();
  // }
  public async SambhalYojana_CheckMemberEligibility(UserId: Number,SchemeId:Number) {
    return await this.http.post(`${this.APIUrl}/SambhalYojana_CheckMemberEligibility/${UserId}/${SchemeId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //GetDownloadFile(request: any) {
  //  debugger;
  //  return this.http.post<any>(`${this.APIUrl}/GetDownloadFile`, request).toPromise();
  //}


}
