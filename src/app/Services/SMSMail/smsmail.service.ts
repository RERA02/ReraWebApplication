

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from '../../Common/GlobalConstants';
import { AppsettingService } from '../../Common/appsetting.service';

import { ApplicationMessageDataModel } from '../../Models/ApplicationMessageDataModel';
import { BulkSMSTemplateDataModel, SendMessege } from '../../Models/SMSDataModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SMSMailService
{
    readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "SMSMail";
  readonly headersOptions: any;
  constructor(private http: HttpClient, private appsettingConfig: AppsettingService)
  {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authtoken')
      })
    };
  }
  handleErrorObservable(error: Response | any)
  {
    return throwError(error);
  }
  public async SendMessage(MobileNo: any, MessageType: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.get(this.APIUrl + "/SendMessage/" + MobileNo + "/" + MessageType)
        .pipe(
          catchError(this.handleErrorObservable)
        ).toPromise();
  }

  public async SendApplicationMessage(request: ApplicationMessageDataModel) {
    var body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/SendApplicationMessage" , body, this.headersOptions)
        .pipe(
          catchError(this.handleErrorObservable)
        ).toPromise();
  }
  public async EventRegisterdEmail(EmailType: string, EventName: string, Email: string, Name: string, RegistrationNo:string) {
   
    return await this.http.post(`${this.APIUrl}/EventRegisterdEmail/${EmailType}/${EventName}/${Email}/${Name}/${RegistrationNo}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async HangfireSendSMSBulk(request: BulkSMSTemplateDataModel) {
    var body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/HangfireSendSMSBulk", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async SendOTP(request: SendMessege) {
    debugger;
    var body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/SendMessege", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


 
}
