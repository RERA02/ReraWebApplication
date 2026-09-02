import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppsettingService } from '../../Common/appsetting.service';
import { catchError, throwError } from 'rxjs';
import { SqlEntityModel } from '../../Models/SQLFireQueryEditorEntity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SqlEditorService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "SqlEditor";
  readonly headersOptions: any;

  constructor(private http: HttpClient, private appsettingConfig: AppsettingService) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authtoken')
      })
    };
  }

  extractData(res: Response) {
    return res;
  }

  handleErrorObservable(error: Response | any) {
    return throwError(error);
  }

  //Get/Set Data
  //public async GetSetSqlData(_sqlEditorText: string) {
  //  const httpOptions = {
  //    headers: new HttpHeaders({
  //      'Content-Type': 'application/json'
  //    })
  //  };
  //  return await this.http.post(this.APIUrl + "/GetSqlEditorList/" + _sqlEditorText, this.headersOptions)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}

  public async GetSetSqlData(model: SqlEntityModel) {
      debugger;

    return await this.http.post(
      this.APIUrl + '/GetSqlEditorList',
      model,
      this.headersOptions
    )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }
  public async ExecuteNonQuerySqlData(model: SqlEntityModel) {
    debugger;

    return await this.http.post(
      this.APIUrl + '/ExecuteNonQuerySqlData',
      model,
      this.headersOptions
    )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }

}
