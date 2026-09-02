import { Injectable } from '@angular/core';
import { AppsettingService } from '../../Common/appsetting.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeedbackGetDataModel, FeedbackModelsDataModel} from '../../Models/FeedbackDataModel';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "Feedback";
  readonly headersOptions: any;

  constructor(private http: HttpClient, private appsettingConfig: AppsettingService) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authtoken')
      })
    };
  }

  submitFeedback(data: any): Observable<any> {
    return this.http.post(this.APIUrl, data, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      );
  }


  public async SaveData(request: FeedbackModelsDataModel) {
    debugger;
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + '/SaveFeedback', request, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public GetfeedbackSavedData(request: FeedbackGetDataModel): Observable<any> {
    debugger;
    return this.http.post<any>(this.APIUrl + '/GetfeedbackSavedData', request, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      );
  }




  handleErrorObservable(error: Response | any) {
    // Optionally, you can add logging here
    return throwError(error);
  }
}
