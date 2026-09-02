import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppsettingService } from '../../Common/appsetting.service';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "ErrorLog";
  readonly headersOptions: any;
  constructor(private http: HttpClient, private appsettingConfig: AppsettingService) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authtoken')
      })
    };
  }


  handleErrorObservable(error: Response | any) {
    return throwError(error);
  }


  //FetchApplicationErrorLog
  public async FetchApplicationErrorLog(Searchkey: string) {
    return await this.http.get(`${this.APIUrl}/FetchApplicationErrorLog/${Searchkey}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //ChangeLogStatus
  public async ChangeLogStatus(Id: number, sType: number) {
    return await this.http.get(`${this.APIUrl}/ChangeLogStatus/${Id}/${sType}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

}
