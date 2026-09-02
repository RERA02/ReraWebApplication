import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../Common/GlobalConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { JobInterfaceEntity,UniversityInterfaceEntity, MasterEntity, MasterFilterEntity, MasterInterfaceEntity, CollegeInterfaceEntity, CommonEntity } from '../../Models/Master';
import { AppsettingService } from '../../Common/appsetting.service';
import { UserMasterModel, UserMasterSerchModel } from '../../Models/UserMasterDataModel';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "Master";
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

  public async MasterList(searchRequest: UserMasterSerchModel) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/GetAllData", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SaveData(request1: MasterInterfaceEntity) {

    const body = JSON.stringify(request1);
    return await this.http.post(this.APIUrl + '/SaveDataSkills', body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetSkillCategory(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SkillCategory`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async StatusEditAction(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/StatusEditAction`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async JobMasterList(searchRequest: UserMasterSerchModel) {
    //var body = JSON.stringify(request);
    /*return await this.http.get(`${this.APIUrl}/GetAllData/${UserID}`, this.headersOptions)*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/GetAllDataJob", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async JobSaveData(request2: JobInterfaceEntity) {

    const body = JSON.stringify(request2);
    return await this.http.post(this.APIUrl + '/SaveDataJob', body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetJobCategory(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/JobCategory`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async JobStatusEditAction(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/JobStatusEditAction`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async UniversityMasterList(searchRequest: UserMasterSerchModel) {
    //var body = JSON.stringify(request);
    /*return await this.http.get(`${this.APIUrl}/GetAllData/${UserID}`, this.headersOptions)*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/UniversityGetAllData", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async UniversitySaveData(request1: UniversityInterfaceEntity) {

    const body = JSON.stringify(request1);
    return await this.http.post(this.APIUrl + '/SaveDataUniversity', body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async UniversityStatusEditAction(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/UniversityStatusEditAction`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async CollegeMasterList(searchRequest: UserMasterSerchModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/CollegeGetAllData", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetUniversityListbyDistrictWise(searchRequest: UserMasterSerchModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/UniversityList", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async CollegeSaveData(request1: CollegeInterfaceEntity) {

    const body = JSON.stringify(request1);
    return await this.http.post(this.APIUrl + '/SaveDataCollege', body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

// vivek 

  SaveDataCommon(request: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/SaveDataCommon`, request);
  }

  public async MasterCommonList(searchRequest: UserMasterSerchModel) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(searchRequest);
    return await this.http.post(this.APIUrl + "/GetAllCommonData", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetCommonType(request: MasterEntity) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/CommonType`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

}
