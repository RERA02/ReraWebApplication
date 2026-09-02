import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppsettingService } from '../../Common/appsetting.service';
import { catchError, Observable, throwError } from 'rxjs';

import { Section, Section1 } from '../../Models/Assessment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  readonly environment = environment;

  readonly APIUrl = this.environment.apiUrls.BaseURL + "Assessment";
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

  //SaveSchemeData
  public async SaveAssessment(request : Section[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SaveAssessment`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SavePsychometricCategory(request: Section1[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SavePsychometricCategory`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SaveAssessmentQuestion(request: any[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SaveQuestions`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async SaveAssessmentPsychometricQuestion2(request: any[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SavePsychometricQuestion2`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SavePsychometricQuestion(request: any[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SavePsychometricQuestion`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetAssessmentList(UserId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetAssessmentList/${UserId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetPsychometricCategoryList(UserId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetPsychometricCategoryList/${UserId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetQuestionList(UserId: number, SelectId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetQuestionList/${UserId}/${SelectId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetPsychometricQuestionList(UserId: number, SelectId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetPsychometricQuestionList/${UserId}/${SelectId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  
  public async GetAssessmentQuestionCount(UserId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetAssessmentList/${UserId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async DeleteAssessment(UserId: number, SelectSectionId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/DeleteAssessment/${UserId}/${SelectSectionId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetJobseekerAssessmentTestQuestion(Id: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetJobseekerAssessmentTestQuestion/${Id}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetAssesmentcategories() {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.get(`${this.APIUrl}/GetAssesmentcategories`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async DeleteQuestion(UserId: number, questionId: number) {
    debugger
    //var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/DeleteQuestion/${UserId}/${questionId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SaveAssessmentQuestionImage(request: any[]) {
    debugger
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/SaveAssessmentQuestionImage`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async CorrectSaveAnswers(answerList: any[], userId: number) {
    debugger
    const body = {
      userId: userId,
      answers: answerList
    };
    return await this.http.post(`${this.APIUrl}/CorrectSaveAnswers`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async getAssessmentScore(userId: number) {
  return await this.http.get(`${this.APIUrl}/GetAssessmentScore/${userId}`, this.headersOptions)
     .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetActiveAssessmentRule() {
  return await this.http
    .get(`${this.APIUrl}/GetActiveAssessmentRule`, this.headersOptions)
    .pipe(
      catchError(this.handleErrorObservable)
    )
    .toPromise();
}

public async GetUserAttemptStatus(userId: number) {
  return await this.http.get<any>(
    `${this.APIUrl}/GetUserAttemptStatus/${userId}`,
    this.headersOptions
  ).pipe(
    catchError(this.handleErrorObservable)
  )
  .toPromise();
}

public async InsertUserAttempt(userId: number) {
  return await this.http.post<any>(
    `${this.APIUrl}/InsertUserAttempt/${userId}`,
    this.headersOptions
  ).pipe(
    catchError(this.handleErrorObservable)
  )
  .toPromise();
}

public async finalizeAssessment(userId: number,attempteId:number) {
  debugger
  return await this.http.post(
    `${this.APIUrl}/FinalizeAssessment/${userId}/${attempteId}`,
   this.headersOptions
  )
  .pipe(
    catchError(this.handleErrorObservable)
  ).toPromise();
}
}
