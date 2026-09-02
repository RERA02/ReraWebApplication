import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppsettingService } from '../../Common/appsetting.service';
import { UploadFileModel } from '../../Models/UploadFileModel';

import { ApplyForNotifications, CommonDetails, JanaadhaarDetailsModel, UserRequestApprovalModel } from '../../Models/CommonMasterDataModel';

import { SendMessege } from '../../Models/SMSDataModel';
import { CouncellorEventModel, JobseekerSearchCouncellorDataModel } from '../../Models/SessionCouncellorDataModel';
import { SessionModel } from '../../Models/SessionBookModel';
import { environment } from '../../../environments/environment';
declare let L: any;
@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {
  readonly environment = environment;
  readonly APIUrl = this.environment.apiUrls.BaseURL + "Common";
  readonly APIUrl2 = this.environment.apiUrls.BaseURL + "Digilocker";
  readonly DocUrl = this.environment.apiUrls.DocumentPath;
  readonly headersOptions: any;
  // Use BehaviorSubject to manage the state of sSOLoginDataModel
  private sSOLoginDataModelSubject = new BehaviorSubject<any>(this.loadSSOLoginDataFromLocalStorage());
  sSOLoginDataModel$ = this.sSOLoginDataModelSubject.asObservable();  // Expose it as an observable
  map: any;
  marker: any;

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

  //Convert enum to list object
  ConvertEnumToList(enumObj: any) {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key))) // Filter out numeric keys
      .map((key) => ({ key, value: enumObj[key] }));
  }

  // Load initial data from localStorage
  private loadSSOLoginDataFromLocalStorage(): any {
    const storedData = localStorage.getItem('SSOLoginUser');
    return storedData ? JSON.parse(storedData) : null;
  }

  // Getter for sSOLoginDataModel
  getsSOLoginDataModel() {
    return this.sSOLoginDataModelSubject.getValue();
  }

  // Set sSOLoginDataModel and persist to localStorage
  setsSOLoginDataModel(data: any) {
    localStorage.setItem('SSOLoginUser', JSON.stringify(data));
    this.sSOLoginDataModelSubject.next(data);  // Emit the new data
  }

  // Clear sSOLoginDataModel and remove from localStorage
  clearsSOLoginDataModel() {
    localStorage.removeItem('SSOLoginUser');
    this.sSOLoginDataModelSubject.next(null);  // Emit null as the state
  }  

  public async GetDesignationMaster() {

    return await this.http.get(this.APIUrl + '/GetDesignationMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetParliamentMaster() {

    return await this.http.get(this.APIUrl + '/GetParliamentMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetAssemblyListByParliament(PCID: number) {

    return await this.http.get(this.APIUrl + '/GetAssemblyListByParliament/' + PCID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetCollegeListByUniversityId(UniversityId: number) {
    return await this.http.get(this.APIUrl + '/GetCollegeListByUniversityId/' + UniversityId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDistrictMaster() {

    return await this.http.get(this.APIUrl + '/GetDistrictMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async GetCasteMaster() {

    return await this.http.get(this.APIUrl + '/GetCasteMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


   public async GetDistrict(StateId: string = '') {

    return await this.http.get(this.APIUrl + "/GetDistrict/" + StateId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetBlockMaster(DistrictId: string = '') {

    return await this.http.get(this.APIUrl + "/GetBlockMaster/" + DistrictId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetGrampanchyatMaster(BlockId: string = '') {

    return await this.http.get(this.APIUrl + "/GetGrampanchyatMaster/" + BlockId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetVillageMaster(GPId: string = '') {

    return await this.http.get(this.APIUrl + "/GetVillageMaster/" + GPId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetCityMaster(DistrictId: string = '') {

    return await this.http.get(this.APIUrl + "/GetCityMaster/" + DistrictId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async GetAllCityMaster() {

    return await this.http.get(this.APIUrl + "/GetAllCityMaster/" , this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetWardMaster(CityId: string = '') {
    return await this.http.get(this.APIUrl + "/GetWardMaster/" + CityId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDivisionMaster() {
    return await this.http.get(this.APIUrl + '/GetDivisionMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetTehsilMaster() {

    return await this.http.get(this.APIUrl + '/GetTehsilMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async CasteCategoryA() {

    return await this.http.get(this.APIUrl + '/CasteCategoryA/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetFinancialYear() {

    return await this.http.get(this.APIUrl + '/GetFinancialYear', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetMonths() {

    return await this.http.get(this.APIUrl + '/GetMonths', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async UploadDocumentForJobSeeker(file: any, model: UploadFileModel | null = null) {
    //formdata
    const formData = new FormData();
    formData.append("file", file);
    formData.append("FolderName", "Jobseeker");
    formData.append("FileExtention", model?.FileExtention ?? "");
    formData.append("MinFileSize", model?.MinFileSize ?? "");
    formData.append("MaxFileSize", model?.MaxFileSize ?? "");
    return await this.http.post(this.APIUrl + "/UploadDocument", formData)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();

  }

  //public async UploadDocumentForProfileJobSeekar(file: any, model: UploadFileModel | null = null) {
  //  //formdata
  //  const formData = new FormData();
  //  formData.append("file", file);
  //  formData.append("FolderName", "ProfileJobSeekar");
  //  formData.append("FileExtention", model?.FileExtention ?? "");
  //  formData.append("MinFileSize", model?.MinFileSize ?? "");
  //  formData.append("MaxFileSize", model?.MaxFileSize ?? "");
  //  return await this.http.post(this.APIUrl + "/UploadDocument", formData)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();

  //}

  //document
  public async UploadFile(file: any, model: UploadFileModel | null = null) {
    //formdata
    const formData = new FormData();
    formData.append("file", file);
    formData.append("FolderName", model?.FolderName ?? "");
    formData.append("FileExtention", model?.FileExtention ?? "");
    formData.append("MinFileSize", model?.MinFileSize ?? "");
    formData.append("MaxFileSize", model?.MaxFileSize ?? "");
    formData.append("Password", model?.Password ?? "");
    return await this.http.post(this.APIUrl + "/UploadFile", formData)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();

  }

  public async UploadDocument(file: any, model: UploadFileModel | null = null) {
    //formdata
    const formData = new FormData();
    formData.append("file", file);
    formData.append("FolderName", model?.FolderName ?? "");    
    formData.append("FileExtention", model?.FileExtention ?? "");
    formData.append("MinFileSize", model?.MinFileSize ?? "");
    formData.append("MaxFileSize", model?.MaxFileSize ?? "");
    return await this.http.post(this.APIUrl + "/UploadDocument", formData)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();

  }
  ////document
  //async UploadDocumentNew(event: any, uploadModel: UploadFileModel) {
  //  try {
  //    const file: File = event.target.files[0];
  //    if (file) {
  //      let fileValue = event.target.value;
  //      // extention
  //      if (uploadModel?.FileExtention != null && uploadModel?.FileExtention != "") {
  //        var _validFileExtensions = uploadModel?.FileExtention?.toLowerCase()?.split(',');
  //        if (_validFileExtensions?.indexOf("." + fileValue.split('.').pop().toLowerCase()) == -1) {
  //          //reset file type
  //          fileValue = null;
  //          //this.toastr.warning(`Invalid extension, allowed only ${uploadModel?.FileExtention}`);
  //          return;
  //        }
  //      }

  //      // min size
  //      if (parseInt(uploadModel?.MinFileSize ?? "0") > 0) {
  //        let acceptMinFileSize = parseInt(uploadModel?.MinFileSize ?? "0");
  //        let fileSize = 0;
  //        if ((uploadModel?.MinFileSize ?? "0").toLowerCase().indexOf("mb") != -1) {
  //          fileSize = Math.round(file.size / 1024 / 1024);
  //        }
  //        else if ((uploadModel?.MinFileSize ?? "0").toLowerCase().indexOf("kb") != -1) {
  //          fileSize = Math.round(file.size / 1024);
  //        }
  //        if (fileSize < acceptMinFileSize) {
  //          //reset file type
  //          fileValue = null;
  //          //this.toastr.warning(`Invalid file size, Min allowed only ${uploadModel?.MinFileSize}`);
  //          return;
  //        }
  //      }

  //      // ṃax size
  //      if (parseInt(uploadModel?.MaxFileSize ?? "0") > 0) {
  //        let acceptMaxFileSize = parseInt(uploadModel?.MaxFileSize ?? "0");
  //        let fileSize = 0;
  //        if ((uploadModel?.MaxFileSize ?? "0").toLowerCase().indexOf("mb") != -1) {
  //          fileSize = Math.round(file.size / 1024 / 1024);
  //        }
  //        else if ((uploadModel?.MaxFileSize ?? "0").toLowerCase().indexOf("kb") != -1) {
  //          fileSize = Math.round(file.size / 1024);
  //        }
  //        if (fileSize > acceptMaxFileSize) {
  //          //reset file type
  //          fileValue = null;
  //          //this.toastr.warning(`Invalid file size, Max allowed only ${uploadModel?.MaxFileSize}`);
  //          return;
  //        }
  //      }

  //      // upload to server folder
  //      return await this.commonMasterService.UploadDocument(file, uploadModel)
  //        .then((data: any) => {
  //          return data;
  //        });
  //    }
  //  }
  //  catch (Ex) {
  //    console.log(Ex);
  //  }
  //}

 
  public async DeleteDocument(path: string) {
    const body = JSON.stringify(path);
    return await this.http.post(this.APIUrl + "/DeleteDocument", body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //end document
  public async GetCommonMasterDDLByType(type: string) {

    return await this.http.get(`${this.APIUrl}/GetCommonMasterDDLByType/${type}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async ParentMenu(DepartmentID: number = 0) {

    return await this.http.get(this.APIUrl + "/ParentMenu/" + DepartmentID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  // act estabhlishment 
     public async GetActEstablishmentMaster() {

    return await this.http.get(this.APIUrl + '/GetActEstablishmentMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
 
  public async GetStateMaster() {

    return await this.http.get(this.APIUrl + '/GetStateMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async Board_UniversityMaster(MasterCode: string) {

    return await this.http.get(this.APIUrl + '/Board_UniversityMaster/' + MasterCode, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async DistrictMaster_StateIDWise(StateID: number) {

    return await this.http.get(this.APIUrl + '/DistrictMaster_StateIDWise/' + StateID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async DistrictMaster_DivisionIDWise(DivisionID: number) {

    return await this.http.get(this.APIUrl + '/DistrictMaster_DivisionIDWise/' + DivisionID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async TehsilMaster_DistrictIDWise(DistrictID: number) {

    return await this.http.get(this.APIUrl + '/TehsilMaster_DistrictIDWise/' + DistrictID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetRoleMasterDDL(DepartmentID: number = 0, EngNonEng: number = 0) {
    return await this.http.get(
      `${this.APIUrl}/GetRoleMasterDDL?DepartmentID=${DepartmentID}&EngNonEng=${EngNonEng}`,
      this.headersOptions
    )
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetCommonMasterData(MasterCode: string, DepartmentID: number = 0, RoleID: number = 0) {

    return await this.http.get(this.APIUrl + '/CommonMasterDataByCode/' + MasterCode + '/' + DepartmentID + '/' + RoleID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetSubCasteCategoryA(CasteCategoryID: number) {
    return await this.http.get(`${this.APIUrl}/GetSubCasteCategoryA/${CasteCategoryID}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDDl_StatusForGrievance() {

    return await this.http.get(this.APIUrl + '/GetDDl_StatusForGrievance/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetCategoryTypeDetails() {
    return await this.http.get(this.APIUrl + '/GetCategoryTypeDetails/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetSubCategoryTypeDetails(categoryId: number) {
    return await this.http.get(`${this.APIUrl}/GetSubCategoryTypeDetails/${categoryId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //FetchBankDetailByUserId
  public async FetchBankDetailByUserId(UserId: number, JanaadharId: string) {
    return await this.http.get(`${this.APIUrl}/FetchBankDetailByUser/${UserId}/${JanaadharId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  //FetchDocumentsByJobSeekarId
  public async FetchDocumentsByJobSeekarId(SchemeId: number, JobSeekerId: number) {
    return await this.http.get(`${this.APIUrl}/FetchDocumentsByJobSeekarId/${SchemeId}/${JobSeekerId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //FetchBankDetailBySchemeId
  public async FetchDocumentMastersByScheme(SchemeId: number) {
    return await this.http.get(`${this.APIUrl}/FetchDocumentMastersByScheme/${SchemeId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async FetchDocumentMastersBy_ID(SchemeId: number) {
    return await this.http.get(`${this.APIUrl}/FetchDocumentMastersBy_ID/${SchemeId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //SendEsignOTP
  public async SendEsignOTP(AadharRefNumber: string) {
    return await this.http.get(`${this.APIUrl}/SendEsignOTP/${AadharRefNumber}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  // FetchUpdatedBankDetailFromJanaadhaar
  public async FetchUpdatedBankDetailFromJanaadhaar(request: JanaadhaarDetailsModel) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/FetchUpdatedBankDetailbyJanaadhaar`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //To Do Mahendra
  public async GetDepartmentMaster() {

    return await this.http.get(this.APIUrl + '/GetDepartmentMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetLevelMaster() {

    return await this.http.get(this.APIUrl + '/GetLevelMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDepartmentLevelMaster(DepartmentId: number) {
    return await this.http.get(`${this.APIUrl}/GetDepartmentLevelMaster/${DepartmentId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDistrictByState(StateID: number) {

    return await this.http.get(this.APIUrl + '/GetDistrictByState/' + StateID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDistrictByDivision(DivisionID: number) {

    return await this.http.get(this.APIUrl + '/GetDistrictByDivision/' + DivisionID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetDesignationByOfficeId(OfficeId: number) {

    return await this.http.get(this.APIUrl + '/GetDesignationByOfficeId/' + OfficeId, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetOfficeByStateDistrictId(StateID: number, DistrictID: number) {

    return await this.http.get(this.APIUrl + '/GetOfficeByStateDistrictId/' + StateID + '/' + DistrictID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetOfficeMaster() {

    return await this.http.get(this.APIUrl + '/GetOfficeMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetModuleMaster() {

    return await this.http.get(this.APIUrl + '/GetModuleMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetSubModuleMaster(ModuleId: number) {
    return await this.http.get(`${this.APIUrl}/GetSubModuleMaster/${ModuleId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetRoleLevelMaster() {

    return await this.http.get(this.APIUrl + '/GetRoleLevelMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetWorkflowRoleMaster(RoleId: number) {
    return await this.http.get(`${this.APIUrl}/GetWorkflowRoleMaster/${RoleId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetWorkflowActionHeadMaster() {

    return await this.http.get(this.APIUrl + '/GetWorkflowActionHeadMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetWorkflowActionMaster() {

    return await this.http.get(this.APIUrl + '/GetWorkflowActionMaster/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetQualificationList() {

    return await this.http.get(this.APIUrl + "/GetQualificationList", this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetDataTreeData() {
    return await this.http.get(this.APIUrl + "/GetDataTreeData", this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  
  public async GetExchangeOfficeList() {
    //const body = JSON.stringify();
    return await this.http.get(`${this.APIUrl}/GetExchangeOfficeList`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetGraduationType(QualificationID: number) {
    return await this.http.get(this.APIUrl + '/GetGraduationType/' + QualificationID, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //FetchUserDetailByUserId
  public async FetchUserDetailByUserId(UserId: number, JanaadharId: string) {
    return await this.http.get(`${this.APIUrl}/FetchUserDetailByUserId/${UserId}/${JanaadharId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

    //FetchUserDetailByUserId
  // public async FetchSchemeDetailByUserId(UserId: number, JanaadharId: string, GovtSchemeId: number) {
  //   return await this.http.get(`${this.APIUrl}/FetchSchemeDetailByUserId/${UserId}/${JanaadharId}/${GovtSchemeId}`, this.headersOptions)
  //     .pipe(
  //       catchError(this.handleErrorObservable)
  //     ).toPromise();
  // }

  public async FetchSchemeDetailByUserId(UserId: number, JanaadharId: string, GovtSchemeId: number) {
    return await this.http.get<any>(
        `${this.APIUrl}/FetchSchemeDetailByUserId/${UserId}/${JanaadharId}/${GovtSchemeId}`,
        {
          headers: this.headersOptions.headers,
          responseType: 'json' as const   // ensures JSON, not ArrayBuffer
        }
      )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }
  

  //FetchSchemeDocumentList
  public async FetchSchemeDocumentList(Id: number, RoleId: number, UserId:number) {
    return await this.http.get(`${this.APIUrl}/FetchSchemeDocumentList/${Id}/${RoleId}/${UserId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //Workflow actions
  public async GetWfApprovalActionList(Id: number, RoleId: number) {
    return await this.http.get(`${this.APIUrl}/GetWorkflowApprovalAction/${Id}/${RoleId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //Get dynamic NCO tree data
  public async GetNCOTreeData() {

    return await this.http.get(this.APIUrl + "/GetNCOTreeData", this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  //new code 
  public async GetAssemblyListByDistrict(DistrictCd: number) {
    return await this.http.get(this.APIUrl + '/GetAssemblyListByDistrictID/' + DistrictCd, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetParliamentByAssemblyId(AssemblyId: number, DistrictId: number) {
    return await this.http.get(this.APIUrl + `/GetParliamentByAssemblyId/${AssemblyId}/${DistrictId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetUniversityList() {
    return await this.http.get(this.APIUrl + "/GetUniversityList", this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetEmploymenType() {
    return await this.http.get(this.APIUrl + "/GetEmploymenType", this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async UserRequestApproval(request: UserRequestApprovalModel) {
    var body = JSON.stringify(request);
    return await this.http.post(`${this.APIUrl}/UserRequestApproval`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async SendMessage(MobileNo: any, Name: string, EventName: string, RegistrationNo: string) {
    debugger;
    return await this.http.get(`${this.APIUrl}/SendSMS/${MobileNo}/${Name}/${EventName}/${RegistrationNo}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async CheckAlreadyRequestedForNewPost(ssoId: string) {
    return await this.http.get(`${this.APIUrl}/CheckAlreadyRequestedForNewPost/${ssoId}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetBasicDetailfromJanaadhar(UserId: number, ActionName: string) {
    return await this.http.get(`${this.APIUrl}/GetBasicDetailfromJanaadhar/${UserId}/${ActionName}`, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async GetEmployerFirmName(UserId: number = 0,FirmType: string) {

    return await this.http.get(this.APIUrl + '/GetEmployerFirmName/' + UserId + '/' + FirmType, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
   
  public async SendMessages(request: SendMessege) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/SendMessage", body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async VerifyOTP(request: SendMessege) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/VerifyOTP", body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetUserInfoForOTP(request: SendMessege) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);
    return await this.http.post(this.APIUrl + "/GetUserInfoForOTP", body, { 'headers': headers })
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //public async RegistrationSendMessage(MobileNo: string, Name: string, EventName: string, RegistrationNo: string) {
    
  //  return await this.http.get(`${this.APIUrl}/SendSMS/${MobileNo}/${Name}/${EventName}/${RegistrationNo}`, this.headersOptions)
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    ).toPromise();
  //}

  public async RegistrationSendMessage(MobileNo: string, Name: string, EventName: string, RegistrationNo: string) {
    return await this.http.get(
      `${this.APIUrl}/SendSMS/${MobileNo}/${encodeURIComponent(Name)}/${encodeURIComponent(EventName)}/${encodeURIComponent(RegistrationNo)}`,
      this.headersOptions
    )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }
  public async JobPostForList(obj: any) {
    const body = JSON.stringify(obj);
    return await this.http.post(`${this.APIUrl}/GetPostedForDDL`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async CheckTabsEntry(CounselorID: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.get(this.APIUrl + "/CheckTabsEntry/" + CounselorID)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

  public async GetEventsorganizd(SSOID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.get(this.APIUrl + "/GetEventsorganizd/" + SSOID)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetEventsList(SSOID: string, FinancialYearID: number, MonthID: number, StartDate: string, EndDate: string) {   
    let url = `${this.APIUrl}/GetEventsList/${SSOID}/${FinancialYearID}/${MonthID}`;  
    if (StartDate && StartDate.trim() !== '') {
      url += `/${StartDate}`;      
      if (EndDate && EndDate.trim() !== '') {
        url += `/${EndDate}`;
      }
    }
    return await this.http.get(url, this.headersOptions)
      .pipe(        
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetCommongetFYYear() {

    return await this.http.get(this.APIUrl + '/GetCommongetFYYear/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async getMonth() {

    return await this.http.get(this.APIUrl + '/getMonth/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  

  public async JobAppliedStatusForList(obj: any) {
    const body = JSON.stringify(obj);
    return await this.http.post(`${this.APIUrl}/JobAppliedStatusForList` ,body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }  
  public async SuggestionSave(SuggestionId: number, SuggestionBoxmsg: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.get(this.APIUrl + "/SuggestionSave/" + SuggestionId + '/' + SuggestionBoxmsg)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  //for  mobile no masking
 mask(value: any): string {
  if (!value) return "";
  const val = value.toString();
  return "*".repeat(val.length - 2) + val.slice(-2);
}

maskEmail(value: string): string {
  if (!value || !value.includes("@")) return value;

  const [name, domain] = value.split("@");

  // Show only first letter of name
  const maskedName =
    name.length > 1 ? name[0] + "*".repeat(name.length - 1) : name;

  return `${maskedName}@${domain}`;
}

// async convertbase64(obj: any) {
//   const body = JSON.stringify(obj);

//  return await this.http.post(`${this.APIUrl}/UploadBase64`, body, this.headersOptions)
//   .pipe(
//     catchError(this.handleErrorObservable)
//   )
//   .toPromise();
// }
convertbase64(obj: any) {
  return lastValueFrom(
    this.http.post(
      `${this.APIUrl}/Pdfbase64`,
      obj,
      this.headersOptions
    )
  );
}

 
arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as any);
  }

  return btoa(binary);
}
// digilocker services
//   getDigiLockerAuthUrl() {
//   return this.http.get(`${this.APIUrl2}/auth-url`);
//   }

// exchangeDigiLockerCode(code: string) {
//   return this.http.post<any>(`${this.APIUrl2}/exchange-code`, { code });
// }
getDigiLockerAuthUrl() {
  return this.http.get(`${this.APIUrl2}/auth-url`, {
    withCredentials: true   // ✅ REQUIRED
  });
}

exchangeDigiLockerCode(code: string) {
  return this.http.post<any>(
    `${this.APIUrl2}/exchange-code`,
    { code },
    { withCredentials: true }   // ✅ REQUIRED
  );
}

// getLatLong(address: string): Observable<any> {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

//     const headers = new HttpHeaders({
//       'Accept-Language': 'en',
//       'User-Agent': 'EEMS.APP'   
//     });

//     return this.http.get(url, { headers });
//   }
 



  public async SendSmsCommon(MobileNo: string, SmsText: string, SmsCategoryType: string, TempId: string,EventId:number) {
    return await this.http.get(
      `${this.APIUrl}/SendSMSCommon/${MobileNo}/${encodeURIComponent(SmsText)}/${encodeURIComponent(SmsCategoryType)}/${encodeURIComponent(TempId)}/${encodeURIComponent(EventId)}`,
      this.headersOptions
    )
      .pipe(catchError(this.handleErrorObservable))
      .toPromise();
  }
  public async GetEventListforJobseekersearch(Request: JobseekerSearchCouncellorDataModel) {
    debugger;
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/GetEventListforJobseekersearch`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }



  public async GetNotifications(UserId: number, ActionName: string) {
    debugger
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.get(this.APIUrl + "/GetNotifications/" + UserId + '/' + ActionName)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetBookedcounselorSession(Request: JobseekerSearchCouncellorDataModel) {   
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/GetBookedcounselorSession`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetCounsellorDetails(Request: JobseekerSearchCouncellorDataModel) {   
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/GetCounsellorDetails`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async BookSession(Request: SessionModel) {
    debugger;
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/BookSession`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async GetListofJobseekerRecommendation(Request: SessionModel) {
    debugger;
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/GetListofJobseekerRecommendation`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async Requestdecline(Request: SessionModel) {
    debugger;
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/Requestdecline`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }
  public async RequestAccept(Request: SessionModel) {
    debugger;
    const body = JSON.stringify(Request);
    return await this.http.post(`${this.APIUrl}/RequestAccept`, body, this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

    public async SaveDataNotificationRead(request: ApplyForNotifications) {
        const body = JSON.stringify(request);
        return await this.http.post(`${this.APIUrl}/NotificationRead`, body, this.headersOptions)
            .pipe(
                catchError(this.handleErrorObservable)
            ).toPromise();

    }

  //public async GetComponentsNew(parentId: number, typeId?: number) {
  //  const params: any = {
  //    parentId: parentId
  //  };

  //  if (typeId !== undefined && typeId !== null) {
  //    params.typeId = typeId;
  //  }
  //  return await this.http
  //    .get(this.APIUrl + '/GetComponentsNew', { params })
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    )
  //    .toPromise();
  //}

  public async GetComponentsNew(parentId: number, typeId?: number) {

    const params: any = {
      parentId: parentId
    };

    if (typeId !== undefined && typeId !== null) {
      params.typeId = typeId;
    }

    return await this.http.get(
      this.APIUrl + '/GetComponentsNew',
      {
        params: params,
        headers: { 'no-loader': 'true' }   
      }
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }

  public async GetVistorCount(Actionname: string) {
    const params: any = {
      Actionname: Actionname
    };
    return await this.http.get(
      this.APIUrl + '/GetVistorCount', { params: params , headers: { 'no-loader': 'true' } }).pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }


  public async GetDeflauterlist(parentId: number, typeId?: number) {

    const params: any = {
      parentId: parentId
    };

    if (typeId !== undefined && typeId !== null) {
      params.typeId = typeId;
    }

    return await this.http.get(
      this.APIUrl + '/GetDeflauterlist',
      {
        params: params,
        headers: { 'no-loader': 'true' }
      }
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }



  //public async GetComponentsNewteshil(parentId: number, typeId?: number) {
  //  const params: any = {
  //    parentId: parentId
  //  };

  //  if (typeId !== undefined && typeId !== null) {
  //    params.typeId = typeId;

  //  }
  //  return await this.http
  //    .get(this.APIUrl + '/GetComponents', { params })
  //    .pipe(
  //      catchError(this.handleErrorObservable)
  //    )
  //    .toPromise();
  //}
  public async GetComponentsNewteshil(parentId: number, typeId?: number) {
    const params: any = {
      parentId: parentId
    };

    if (typeId !== undefined && typeId !== null) {
      params.typeId = typeId;
    }

    return await this.http
      .get(this.APIUrl + '/GetComponents', {
        params: params,
        headers: { 'no-loader': 'true' }   // 👈 loader skip
      })
      .pipe(
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  public CommonDetails(request: any) {
    return this.http.post(
      `${this.APIUrl}/CommonDetails`,
      request,
      this.headersOptions
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }

  public GetAllAgentDocumentUploadList(request: any) {
    return this.http.post(
      `${this.APIUrl}/GetAllAgentDocumentUploadList`,
      request,
      this.headersOptions
    ).pipe(
      catchError(this.handleErrorObservable)
    ).toPromise();
  }

  public async getYear() {

    return await this.http.get(this.APIUrl + '/GetYear/', this.headersOptions)
      .pipe(
        catchError(this.handleErrorObservable)
      ).toPromise();
  }

}
