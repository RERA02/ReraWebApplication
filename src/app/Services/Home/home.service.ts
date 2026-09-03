import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../Common/GlobalConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppsettingService } from '../../Common/appsetting.service';
import { environment } from '../../../environments/environment';
import { ComplaintResponseCreateModel, GetComplaintsAgainstRespondenSearch, WebSite_ContactUsSave } from '../../Models/SSOLoginDataModel';
import {
  ProjectSearchModel, Web_GetAllNoticeSearModel, Web_TBL_AUDITTRAILSearchModel, AgentSearchModel,
  ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF, ComplaintDocumentUploadsS_M, ComplaintdetailsSearchModel, GetUploadedDocumentsSPModel, ViolationofActModel, Web_TBL_RejoinderSearchModel
} from '../../Models/Master';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "Home";
  readonly APIUrlHome = this.environment.apiUrls.BaseURL + "Home";
  readonly MvcUrl = this.environment.apiUrls.BaseURLMvc;
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

  //Get all data
  public async GetAllPost(postId: number = 0, DepartmentID: number = 0) {
    return await this.http.get(`${this.APIUrl}/GetAllPost/${postId}/${DepartmentID}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async ContactUs(request: WebSite_ContactUsSave) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/ContactUs", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetVisitorCount(key: string = '') {

    return await this.http.get(`${this.APIUrlHome}/GetVisitorCount/${key}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetComplaintsAgainstRespondentList(request: GetComplaintsAgainstRespondenSearch) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/GetComplaintsAgainstRespondentList", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  getProjectById(ProjectId: string) {
    ;
    const url = `${this.APIUrl}/GetProjectById`;
    const body = { ProjectId };

    return this.http.post<any>(url, body)
      .pipe(
        catchError(this.handleErrorObservable)
      );
  }
  //Get all data
  public async GetProjectList(searchModel: ProjectSearchModel) {

    const body = {
      DistrictId: searchModel.districtId,
      TeshilId: searchModel.tehsilId,
      ProjectName: searchModel.projectName,
      PromoterName: searchModel.promoterName,
      RegistrationNo: searchModel.registrationNo,
      ProjectType: searchModel.projectType,
      ApplicationStatus: searchModel.status,
      Year: searchModel.year
    };

    return await this.http
      .post(this.APIUrl + '/GetProjects', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  public async GetDeflauterlist(searchModel: ProjectSearchModel) {

    const body = {
      DistrictId: searchModel.districtId,
      TeshilId: searchModel.tehsilId,
      ProjectName: searchModel.projectName,
      PromoterName: searchModel.promoterName,
      RegistrationNo: searchModel.registrationNo,
      ProjectType: searchModel.projectType,
      ApplicationStatus: searchModel.status,
      Year: searchModel.year,
      OrderPassedby:searchModel.OrderPassedby
    };

    return await this.http
      .post(this.APIUrl + '/GetDeflauterlist', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }


  public async GetWeb_TBL_AUDITTRAIL(request: Web_TBL_AUDITTRAILSearchModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/GetWeb_TBL_AUDITTRAIL", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetWeb_GetAllNotice(request: Web_GetAllNoticeSearModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/GetWeb_GetAllNotice", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetAgentList(searchModel: AgentSearchModel) {

    const body = {
      districtId: searchModel.districtId,
      tehsilId: searchModel.tehsilId,
      agentName: searchModel.agentName,
      registrationNo: searchModel.registrationNo

    };

    return await this.http
      .post(this.APIUrl + '/GetAgents', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }
  public async GetHomePageData() {

    return await this.http.get(`${this.APIUrlHome}/GetHomePageData`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public ComplaintAdjudicatingPDF(request: ComplaintAdjudicatingPDF) {
    return this.http.post(
      `${this.APIUrlHome}/ComplaintAdjudicatingPDF`,
      request,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }
    ).pipe(
      catchError(this.handleErrorObservable)
    );
  }

  public async GetComplaintDocumentUploadsByComplaintNumber(request: ComplaintDocumentUploadsS_M) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/GetComplaintDocumentUploadsByComplaintNumber", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  GetAgentWebsiteData(id: string) {
    debugger
    return this.http.get(
      `${this.MvcUrl}HomeWebsite/ViewAgentWebsite/${id}`
    ).toPromise();
  }

  public async GetComplainantList(searchModel: ComplaintdetailsSearchModel) {

    const body = {
      compalaint_no: searchModel.compalaint_no,
      complainant: searchModel.complainant,
      complaint_status: searchModel.complaint_status,
      respondent_name: searchModel.respondent_name

    };

    return await this.http
      .post(this.APIUrl + '/GetComplainantList', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }



  GetComplaintData(complaint_status: string, compalaint_no: string = '', ComplaintTypeId: number = 0, respondent_name: string = '', complainant: string = '') {
    const params = {
      complaint_status: complaint_status,
      compalaint_no: compalaint_no,
      ComplaintTypeId: ComplaintTypeId,
      respondent_name: respondent_name,
      complainant: complainant
    };

    return this.http.get<any>(
      `${this.MvcUrl}HomeWebsite/GetComplaintFullDetailsWebsite`,
      { params }
    ).toPromise();
  }
  public async GetCauseList(searchModel: GetUploadedDocumentsSPModel) {

    const body = {
      id: searchModel.id,
      complientNo: searchModel.complientNo,
      PartyName: searchModel.PartyName,
      OrderfromDate: searchModel.OrderfromDate,
      OrdertoDate: searchModel.OrdertoDate,
      DocumentName: searchModel.DocumentName,
      Commontext: searchModel.Commontext,
      FinYearId: searchModel.FinYearId,
      causeListType: searchModel.causeListType,
      OrderNumber: searchModel.OrderNumber

    };

    return await this.http
      .post(this.APIUrl + '/GetUploadedDocumentsSP', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  GetUserDetailsWebsite(DashBoardstatus: string = '', name: string = '', UserType: number = 0, PanNumber: string = '', district: number = 0, username: string = '', sso: string = '', email: string = '', mobileno: string = '') {

    const params = {

      DashBoardstatus,

      name,

      UserType: UserType.toString(),

      PanNumber,

      district: district.toString(),

      username,

      sso,

      email,

      mobileno

    };

    return this.http.get<any>(

      `${this.MvcUrl}HomeWebsite/GetUserDetailsWebsite`,

      { params }

    ).toPromise();

  }

  GetUserSummaryWebsite(

    userId: number = 0,

    type: number = 0,

    typemode: number = 0,

    PNR: string = ''

  ) {

    const params = {

      userId: userId,

      type: type,

      typemode: typemode,

      PNR: PNR

    };

    return this.http.get<any>(

      `${this.MvcUrl}HomeWebsite/GetUserSummaryWebsite`,

      { params }

    ).toPromise();

  }


  public async GetUpdatedDailyCauseListbyparameter() {

    return await this.http.get(`${this.APIUrlHome}/GetUpdatedDailyCauseListbyparameter`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  GetProjectDtlsWebsite(id: string) {
    return this.http.get(
      `${this.MvcUrl}HomeWebsite/ProjectDtlsWebsite/${id}`
    ).toPromise();
  }

  
  GetProjectQrCode(id: number = 0) {
    const params = {
      id: id
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetProjectQrCode`, { params }).toPromise();
  }


  public async ViolationofAct(searchModel: ViolationofActModel) {

    const body = {
      Compalaintno: searchModel.Compalaintno,
      Action: searchModel.Action
    };
    return await this.http
      .post(this.APIUrl + '/GetViolationActCompliants', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  ViolationActSummaryWebsite(ComplaintId: number) {

    return this.http.get(
      `${this.MvcUrl}HomeWebsite/ViolationActSummaryWebsite`,
      {
        params: { ComplaintId: ComplaintId }
      }
    ).toPromise();
  }
  GetViolationComplaintImagesWebsite(Id: number) {

    return this.http.get(
      `${this.MvcUrl}HomeWebsite/GetViolationComplaintImagesWebsite`,
      {
        params: { Id: Id }
      }
    ).toPromise();
  }

  SaveComplaintBoxWebSite(data: FormData) {
    return this.http.post(
      `${this.MvcUrl}HomeWebsite/ComplaintBoxWebSite`,
      data
    ).toPromise();
  }


  public async GetProjectExtensionView(ProExtId: string = "", isUnderProcess: string = "") {
    const params = {
      ProExtId,
      isUnderProcess
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/ProjectExtensionViewWebSite`, { params }).toPromise();
  }

  public async ProModSummaryWebSite(ID: string = "") {
    const params = {
      ID
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/ProModSummaryWebSite`, { params }).toPromise();
  }

  public async GetPlotDtlView(ID: number = 0, PID: number = 0, Ptype: number = 0, Admin: number = 0) {
    const params = {
      ID, PID, Ptype, Admin
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetPlotDtlView`, { params }).toPromise();
  }
  public async GetProModParking(ID: number = 0, PID: number = 0, Ptype: number = 0) {
    const params = { MainID: ID, PID, Ptype };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetPRoMODParking`, { params }).toPromise();
  }

  public async GetProModLitigation(ID: number = 0, PType: number = 0, MainID: number = 0) {
    const params = { ID, PType, MainID };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetProModLitigation`, { params }).toPromise();
  }

  public async GetPromodViewBuild(ID: number = 0, PID: number = 0, Ptype: number = 0, Admin: number = 0) {
    const params = { ID, PID, Ptype, Admin };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetPromodViewBuild`, { params }).toPromise();
  }

  public async GetProModConsultant(ID: number = 0, PID: number = 0, Ptype: number = 0, Admin: number = 0) {
    const params = { ID, PID, Ptype, Admin };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetProModConsultant`, { params }).toPromise();
  }

  ViewProjectWebsite(id: string, type: string) {

    return this.http.get(
      `${this.MvcUrl}HomeWebsite/ViewProjectWebsite`,
      {
        params: {
          id: id,
          type: type
        }
      }
    ).toPromise();
  }

  public async GetMapRevisionView(MapIDEnc: string = "", isUnderProcess: string = "") {
    const params = {
      MapIDEnc,
      isUnderProcess
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/MapRevisionViewWebSite`, { params }).toPromise();
  }

  public async GetAPRSummaryWebSite(projectId: string = "", QID: string = "") {
    const params = {
      projectId,
      QID
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetAPRSummaryWebSite`, { params }).toPromise();
  }

  public async QPRSummaryWebSite(projectIdEnc: string = "", QuarterIdEnc: string = "", PT: number = 0, isUnderProcess: string = "", QPRPId: number = 0) {
    const params = {
      projectIdEnc,
      QuarterIdEnc,
      PT,
      isUnderProcess,
      QPRPId
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/QPRSummaryWebSite`, { params }).toPromise();
  }


  public async PASummaryWebSite(PID: string = "", AppID: string = "") {
    const params = {
      ProjectId: PID,
      ApplicationID: AppID
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/PA_summaryDataWebSite`, { params }).toPromise();
  }

  public async SpecialProfileModificationSummaryWebSite(ID: string = "", UID: string = "") {
    const params = {
      Id: ID,
      UId: UID
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/SpecialModificationProfileSummaryWebSite`, { params }).toPromise();
  }

  public async SpecialProfileModificationPartnerDtls(_AppID: string = "", _Type: string = "", _Show: string = "") {
    const params = {
      AppID: _AppID,
      Type: _Type,
      Show: _Show
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetSpecialModificationPartnersForWebSiteView`, { params }).toPromise();
  }

  public async FillDDL(_ParentID: any = 0, _typeid: number = 0) {
    const params = {
      ParentID: _ParentID,
      typeId: _typeid

    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetComponentsByIdType`, { params }).toPromise();
  }

  public async FillStateDDL(_ParentID: any = 0) {
    return this.http.get<any>(
      `${this.MvcUrl}HomeWebsite/AllFalseTrueStateProvinces`
    ).toPromise();
  }


  public async GetEncumSummary(_EncumID: string = "") {
    const params = {
      EncumID: _EncumID
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/EncumSummaryViewWebSite`, { params }).toPromise();
  }




  public async Get_ProjectStatus(ProjectID: string) {
    const params: any = {
      ProjectID: ProjectID
    };

    return await this.http
      .get(this.APIUrl + '/Get_ProjectStatus', { params })
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }
  public async Get_ProjectStatus_Single(ProjectID: string) {
    const params: any = {
      ProjectID: ProjectID
    };

    return await this.http
      .get(this.APIUrl + '/Get_ProjectStatus_Single', { params })
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  SaveComplaintBoxWebSites(data: any) {
    // Send as JSON
    return this.http.post(`${this.APIUrl}/SaveComplaint`, data).toPromise();
  }


  public async MyProfileApi(profileType: number = 0, tabId: number = 0, message: string = '', TypeMod: number = 0, paramCurrentUserId: number = 0, AppNo: string = '') {

    const params: any = { profileType: profileType, tabId: tabId, message: message, TypeMod: TypeMod, paramCurrentUserId: paramCurrentUserId, AppNo: AppNo };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/MyProfileApi`, { params }).toPromise();
  }

  public async IndividualProfileGetPartialApi(typeMod: number = 0, paramCurrentUserId: number = 0) {
    const params: any = {
      typeMod: typeMod,
      paramCurrentUserId: paramCurrentUserId
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/IndividualProfileGetPartialApi`, { params }).toPromise();
  }

  public async AnnualReportWebSite() {

    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/AnnualReportWebSite`).toPromise();
  }



  public async GetAgentsListWebSite(district: number = 0, teshil: number = 0, projectName: string = "", promoterName: string = "", certificateNo: string = "") {
    const params = {
      district: district,
      teshil: teshil,
      projectName: projectName,
      promoterName: promoterName,
      certificateNo: certificateNo
    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetAgentsListWebSite`, { params }).toPromise();
  }


  public async SendQueryToAdminWebSite(request: WebSite_ContactUsSave) {
    debugger
    return await this.http.post(
      this.MvcUrl + "HomeWebsite/SendQueryToAdminWebSite",
      request
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }

  public async GetResponseMobileNoWebSite(TempComplaintNo: string = "", Chked: number = 0, RespondentMobileNo: string = "", RespondentEmail: string = "") {
    const params = {
      TempComplaintNo: TempComplaintNo,
      Chked: Chked,
      RespondentMobileNo: RespondentMobileNo,
      RespondentEmail: RespondentEmail,

    };
    return this.http.get<any>(`${this.MvcUrl}HomeWebsite/GetResponseMobileNoWebSite`, { params }).toPromise();
  }


  public async RespondantResponsePostWebSite(
    request: ComplaintResponseCreateModel,
    id: string,
    ComplaintNumber: string
  ) {
    return await this.http.post(
      this.MvcUrl + "HomeWebsite/RespondantResponsePostWebSite?id=" + id + "&ComplaintNumber=" + ComplaintNumber,
      request
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }

  public async GetPatchDate() {

    return await this.http.get(`${this.MvcUrl}HomeWebsite/GetPatchLastUpdatedDateWebSite/`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async AddVisitorCount(key: string = '') {
    return await this.http.post(
      `${this.APIUrlHome}/AddVisitorCount`,
      JSON.stringify(key),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }


  public UploadResponseFilesWebSite(
    fileSave: File,
    TempComplaintNo: string,
    RespondentMobileNo: string,
    RespondentEmail: string
  ) {
    const formData = new FormData();

    formData.append('fileSave', fileSave); // must match backend
    formData.append('TempComplaintNo', TempComplaintNo);
    formData.append('RespondentMobileNo', RespondentMobileNo);
    formData.append('RespondentEmail', RespondentEmail);

    return this.http.post(
      `${this.MvcUrl}HomeWebsite/UploadResponseFilesWebSite`,
      formData
    );
  }

  public async Get_ViewReplyResponse(ComplaintNumber: string) {
    return await this.http.get(
      `${this.APIUrl}/Get_ViewReplyResponse?ComplaintNumber=${ComplaintNumber}`,
      this.headersOptions
    )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }

  public async GetWeb_TBL_RejoinderDetails(request: Web_TBL_RejoinderSearchModel) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrlHome + "/GetWeb_TBL_RejoinderDetails", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }



  public async GetComplainantListWebsite(searchModel: ComplaintdetailsSearchModel) {

    const body = {
      compalaint_no: searchModel.compalaint_no,
      complainant: searchModel.complainant,
      complaint_status: searchModel.complaint_status,
      respondent_name: searchModel.respondent_name,
      ComplaintTypeId: searchModel.ComplaintTypeId

    };

    return await this.http
      .post(this.APIUrl + '/GetComplaintDetailsWebsite', body)
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  public async Get_Location(ProjectID: string) {
    const params: any = {
      ProjectID: ProjectID
    };

    return await this.http
      .get(this.APIUrl + '/GetProjectIdWiseEndPointsLocation', { params })
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }
  public async GetprojectDetailsbyDepecryValue(id: string) {
    return await this.http
      .post(this.APIUrl + '/GetprojectDetailsbyDepecryValue',
        { ProjectId: id }
      )
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  public async GetprojectDetailsbyDepecryValueCommon(type: string , id: string) {
    return await this.http
      .post(this.APIUrl + '/GetDepecryValueCommon',
        {
          type: type,
          ProjectId: id
        }
      )
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }
  getProjectQrCodeSingle(id: string) {
    return this.http.get<any>(
      `${this.APIUrl}/GetProjectQrCode?id=${encodeURIComponent(id)}`
    );
  }
  executeQuery(query: string) {
    return this.http.post(
      `${this.APIUrl}/execute`,
      {
        query: query
      }
    );
  }
  // Search Stored Procedures
  searchSP(search: string): Observable<string[]> {

    return this.http.get<string[]>(
      `${this.APIUrl}/stored-procedures?search=${encodeURIComponent(search)}`
    );
  }

  // Get SP Definition
  getSPDefinition(spName: string): Observable<any> {

    return this.http.get(
      `${this.APIUrl}/stored-procedure-definition?name=${encodeURIComponent(spName)}`
    );
  }

}








