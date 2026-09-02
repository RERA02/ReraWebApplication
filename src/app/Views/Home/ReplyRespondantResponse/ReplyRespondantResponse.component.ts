import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { ComplaintResponseCreateModel, GetComplaintsAgainstRespondenSearch, SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingPDF, Web_GetAllNoticeSearModel, Web_TBL_AUDITTRAILSearchModel, ComplaintDocumentUploadsS_M, Web_TBL_RejoinderSearchModel } from '../../../Models/Master';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ReplyRespondantResponse',
  templateUrl: './ReplyRespondantResponse.component.html',
  styleUrls: ['./ReplyRespondantResponse.component.css'],
  standalone: false
})

export class ReplyRespondantResponseComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public GetComplaintsAgainstRespondentList: any[] = [];
  public Web_TBL_AUDITTRAILList: any[] = [];
  public Web_TBL_RejoinderList: any[] = [];
  public complaintDocuments: any[] = [];
  public GetAllNotice: any[] = [];
  public PlacementCompanyList: any[] = [];

  public sSOLoginDataModel = new SSOLoginDataModel();
  public _Search = new GetComplaintsAgainstRespondenSearch();
  public _NoticeSearModel = new Web_GetAllNoticeSearModel();
  public _ComplaintDocument = new ComplaintDocumentUploadsS_M();
  public web_TBL_AUDITTRAIL = new Web_TBL_AUDITTRAILSearchModel();
  public request = new ComplaintAdjudicatingPDF();
  public model = new ComplaintResponseCreateModel();
  public web_TBL_Rejoinder = new Web_TBL_RejoinderSearchModel();
  docUrl: string = "";
  TempComplaintNo: string = "";
  Chked: number = 0;
  DataChked: number = 0;
  RespondentMobileNo: string = "";
  RespondentEmail: string = "";
  GenerateOTP: string = "";
  isOtpValid: boolean = false;
  ErrorMessageOTP: string = "";
  SendMessageOTP: string = "";
  SaveFileTypeNew: string = "";
  commentMessage: string = "";
  DataMessage: string = "";
  response: any;
  pagedProjectList: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  responseForm!: FormGroup;
  frommodel: any;
  isShow: boolean = false;
  userData: any = {};
  selectedFile: File | null = null;
  responseData: any[] = [];
  IsSubmited: boolean = false;
  ComplaintTypeId: number = 0;
  constructor(private cdr: ChangeDetectorRef, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal, private fb: FormBuilder) {

  }

  async ngOnInit() {
    console.log('Home');
    this.isShow = false;
    this.responseForm = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      document: [''],
      comment: [''],
      otp: [''],
      ComplaintTypeId: [0]
    });

    this.sSOLoginDataModel.DepartmentID = 1;
    await this.GetComplaintsAgainstRespondentListData();
    sessionStorage.clear();
    localStorage.clear();
    this.cdr.markForCheck();
    this.docUrl = this.commonMasterService.DocUrl;
  }

  // get all data
  async GetComplaintsAgainstRespondentListData() {
    try {
      this.GetComplaintsAgainstRespondentList = [];
      this.totalRecords = 0;
      this._Search.Action = 'againstpromoter';
      this._Search.ComplaintNumber = '';
      this.loaderService.requestStarted();
      await this.homeService.GetComplaintsAgainstRespondentList(this._Search)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          if (data && data.Data && data.Data.length > 0) {
            this.GetComplaintsAgainstRespondentList = data['Data'];
            this.totalRecords = data['Data'].length;
            this.currentPage = 1;
            this.calculatePagination();
            console.log(this.GetComplaintsAgainstRespondentList, "GetComplaintsAgainstRespondentList")
          }
          else {
            this.pagedProjectList = [];
            this.GetComplaintsAgainstRespondentList = [];
            this.totalRecords = 0;
          }
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
      this.GetComplaintsAgainstRespondentList = [];
      this.pagedProjectList = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  async SearchData() {
    debugger
    try {
      this.GetComplaintsAgainstRespondentList = [];
      this.totalRecords = 0;
      this._Search.Action = 'againstpromoter';
      this.loaderService.requestStarted();
      await this.homeService.GetComplaintsAgainstRespondentList(this._Search)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          if (data && data.Data && data.Data.length > 0) {
            this.GetComplaintsAgainstRespondentList = data['Data'] || [];
            this.totalRecords = data['Data'].length;
            this.currentPage = 1;
            this.calculatePagination();
            console.log(data);
            console.log(this.GetComplaintsAgainstRespondentList, "GetComplaintsAgainstRespondentList")
          }
          else {
            this.GetComplaintsAgainstRespondentList = [];
            this.pagedProjectList = [];
            this.totalRecords = 0;
          }
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
      this.pagedProjectList = [];
      this.GetComplaintsAgainstRespondentList = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }

  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.GetComplaintsAgainstRespondentList.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    debugger
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProjectList = this.GetComplaintsAgainstRespondentList.slice(startIndex, endIndex);

  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }
  get startRecord(): number {
    if (this.GetComplaintsAgainstRespondentList.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.GetComplaintsAgainstRespondentList.length
    );
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  paginationWindowSize = 10; // show 10 page numbers at a time

  get totalPages1(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get visiblePages(): number[] {
    const startPage =
      Math.floor((this.currentPage - 1) / this.paginationWindowSize) *
      this.paginationWindowSize +
      1;

    const endPage = Math.min(
      startPage + this.paginationWindowSize - 1,
      this.totalPages
    );

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
  ShowPreview(content: any, item: any) {
    // assign values from selected row
    this.web_TBL_AUDITTRAIL.Projectid = item.ProjectId;
    this.web_TBL_AUDITTRAIL.TableId = item.ComplaintDetailId;
    this.web_TBL_AUDITTRAIL.Type = item.ComplaintType == 4 ? 38 : 3;

    // call API
    this.GetWeb_TBL_AUDITTRAIL();

    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }

  async CloseModalPopup() {
    this.isShow = false;
    this.modalService.dismissAll();
    this.responseForm.reset();
    this.DataMessage = "";
    this.IsSubmited = false;
  }


  async CloseModalPopup1() {
    this.modalService.dismissAll();

  }

  async CloseModalPopup2() {
    this.modalService.dismissAll();

  }

  async GetWeb_TBL_AUDITTRAIL() {
    debugger
    try {

      this.loaderService.requestStarted();
      await this.homeService.GetWeb_TBL_AUDITTRAIL(this.web_TBL_AUDITTRAIL)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.Web_TBL_AUDITTRAILList = data?.Data ?? [];
          console.log(this.Web_TBL_AUDITTRAILList, "GetWeb_TBL_AUDITTRAIL")
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  async GetWeb_GetAllNotice() {
    try {
      debugger
      this._NoticeSearModel.Action = 'AllNotice';

      this.loaderService.requestStarted();
      await this.homeService.GetWeb_GetAllNotice(this._NoticeSearModel)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.GetAllNotice = data?.Data ?? [];

          console.log(this.GetAllNotice, "GetAllNotice")
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  ShowGetAllNotice(content: any, item: any) {

    // assign values from selected row
    this._NoticeSearModel.ComplaintNumber = item.ComplaintNumber;

    // call API
    this.GetWeb_GetAllNotice();

    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }




  PreviewViewDocuments(content: any, item: any) {
    debugger
    // assign values from selected row

    this._ComplaintDocument.ComplaintNumber = item.ComplaintNumber;
    //this._ComplaintDocument.ComplaintNumber = 'RAJ-RERA-C-N-2025-8689';
    // call API
    this.GetComplaintDocumentUploads();

    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }

  async GetComplaintDocumentUploads() {
    try {
      debugger


      this.loaderService.requestStarted();
      await this.homeService.GetComplaintDocumentUploadsByComplaintNumber(this._ComplaintDocument)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.complaintDocuments = data?.Data ?? [];

          console.log(this.complaintDocuments, "complaintDocuments")
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  //async GetComplaintAdjudicatingPDF() {
  //  try {
  //    this.loaderService.requestStarted();

  //    this.request.id =  7343 ;

  //    this.homeService.ComplaintAdjudicatingPDF(this.request)
  //      .subscribe({
  //        next: (html: string) => {
  //          // ✅ OPEN HTML IN NEW TAB
  //          const newWindow = window.open('', '_blank');
  //          if (newWindow) {
  //            newWindow.document.open();
  //            newWindow.document.write(html);
  //            newWindow.document.close();
  //          }
  //        },
  //        error: (err) => {
  //          console.error(err);
  //        },
  //        complete: () => {
  //          this.loaderService.requestEnded();
  //        }
  //      });

  //  } catch (ex) {
  //    console.error(ex);
  //    this.loaderService.requestEnded();
  //  }
  //}


  async GetComplaintAdjudicatingPDF(ComplaintDetailId: number, complaintType: number) {
    try {
      debugger
      this.loaderService.requestStarted();

      this.request.id = ComplaintDetailId;


      if (this.request.id > 9463) {
        var k = this.docUrl + "Home/ComplaintBeforePDFNew?id=" + this.request.id
        const win = window.open(k, '_blank');
      }
      else {
        if (complaintType == 1) {
          var k = this.docUrl + "Home/ComplaintBeforePDF?id=" + this.request.id
          const win = window.open(k, '_blank');
        }
        else if (complaintType == 2) {
          var k = this.docUrl + "Home/ComplaintAdjudicatingPDF?id=" + this.request.id
          const win = window.open(k, '_blank');
        }
      }




    } catch (err) {
      console.error(err);
    } finally {
      this.loaderService.requestEnded();
    }
  }
  getDocumentFileUrl(documentUrl: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (documentUrl && documentUrl.trim() !== '') {
      const fileName = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);
      const url = this.docUrl + `Content/uploads/${fileName}`;

      // reuse same tab instead of opening multiple
      window.open(url, 'documentWindow');
    }
  }

  //getDocumentFileUrl(documentUrl: string, event: Event) {
  //  event.preventDefault();
  //  event.stopPropagation();

  //  if (documentUrl && documentUrl.trim() !== '') {
  //    const fileName = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);
  //    const url = `https://reraapp.rajasthan.gov.in/Content/uploads/${fileName}`;

  //    // reuse same tab instead of opening multiple
  //    window.open(url, 'documentWindow');
  //  }
  //}



  ShowResponseDetail(content: any, item: any) {
    debugger;
    // assign values from selected row
    if (item.ComplaintType == 4) {
      this.IsSubmited = true;
      this.responseForm.get('mobileNo')?.clearValidators();
      this.responseForm.get('mobileNo')?.updateValueAndValidity();

      this.responseForm.get('email')?.clearValidators();
      this.responseForm.get('email')?.updateValueAndValidity();
      this.ComplaintTypeId = item.ComplaintType;
    }
    else {
      this.responseForm.get('mobileNo')?.setValidators([
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]);
      this.responseForm.get('mobileNo')?.updateValueAndValidity();

      this.responseForm.get('email')?.setValidators([
        Validators.required,
        Validators.email
      ]);
      this.responseForm.get('email')?.updateValueAndValidity();
      this.ComplaintTypeId = item.ComplaintType;
    }
    this.TempComplaintNo = item.ComplaintNumber;

    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }
  async GetResponseMobileNoWebSite() {
    debugger;

    if (this.responseForm.invalid) {
      this.responseForm.markAllAsTouched();
      return;
    }

    this.RespondentMobileNo = this.responseForm.get('mobileNo')?.value;
    this.RespondentEmail = this.responseForm.get('email')?.value;
    this.commentMessage = this.responseForm.get('comment')?.value;


    //this.TempComplaintNo = "RAJ-RERA-C-O-2025-8650";

    if (this.TempComplaintNo && this.RespondentMobileNo && this.RespondentEmail) {
      try {
        const data: any = await this.homeService.GetResponseMobileNoWebSite(
          this.TempComplaintNo,
          this.Chked,
          this.RespondentMobileNo,
          this.RespondentEmail
        );

        console.log(data);

        // ✅ NULL / UNDEFINED CHECK
        if (data && data !== null) {
          this.DataChked = data?.Chek;
          if (this.DataChked == 1) {
            this.isShow = true;
            this.userData = data;
            this.GenerateOTP = data?.GenerateOTP || '';
            this.IsSubmited = true;
            this.SendMessageOTP = "One-time password is sent successfully on your email."
            this.DataMessage = "";
          }
          else {
            debugger
            this.isShow = false;
            this.userData = null;
            this.GenerateOTP = '';
            this.IsSubmited = false;
            //this.responseForm.get('mobileNo')?.setValue(this.RespondentMobileNo);
            //this.responseForm.get('email')?.setValue(this.RespondentEmail);
            //this.responseForm.get('document')?.setValue(this.SaveFileTypeNew);
            //this.responseForm.get('comment')?.setValue(this.commentMessage);
            setTimeout(() => {
              this.responseForm.patchValue({
                mobileNo: this.RespondentMobileNo,
                email: this.RespondentEmail,
                document: this.SaveFileTypeNew,
                comment: this.commentMessage
              });
            }, 0);

            this.DataMessage = "No records found for the entered mobile number or email.";
          }

        } else {
          // ❌ Handle null response
          this.isShow = false;
          this.userData = null;
          this.GenerateOTP = '';
          this.IsSubmited = false;
          console.error('No data found');
        }

      } catch (error) {
        console.error('Error fetching data:', error);

        // ❌ Handle API error
        this.isShow = false;
        this.userData = null;
        this.GenerateOTP = '';
      }
    } else {
      console.error('Missing required values.');
    }
  }
  //async GetResponseMobileNoWebSite() {
  //  debugger
  //  this.RespondentMobileNo = this.responseForm.get('mobileNo')?.value;
  //  this.RespondentEmail = this.responseForm.get('email')?.value;
  //  this.TempComplaintNo = "RAJ-RERA-C-O-2025-8650";
  //  if (this.TempComplaintNo && this.RespondentMobileNo && this.RespondentEmail) {
  //    try {
  //      const data: any = await this.homeService.GetResponseMobileNoWebSite(
  //        this.TempComplaintNo,
  //        this.Chked,
  //        this.RespondentMobileNo,
  //        this.RespondentEmail
  //      );
  //      console.log(data);
  //      this.isShow = true;
  //      this.userData = data;
  //      this.GenerateOTP = data.GenerateOTP;
  //    } catch (error) {
  //      console.error('Error fetching data:', error);
  //    }
  //  } else {
  //    console.error('Missing required values.');
  //  }
  //}

  async GenerateResponseSave() {
    debugger;

    if (this.responseForm.invalid) {
      this.responseForm.markAllAsTouched();
      this.SendMessageOTP = "";
      return;
    }

    if (this.GenerateOTP == this.responseForm.value.otp) {
      this.isOtpValid = true;
      this.SendMessageOTP = "";
      this.ErrorMessageOTP = "OTP verified successfully";
      this.model.ComplaintNumberPartial = this.TempComplaintNo;
      this.model.FileTypeNew = this.SaveFileTypeNew;
      this.model.Comment = this.responseForm.value.comment;
      this.model.RespondentMobileNo = this.responseForm.value.mobileNo;
      this.model.RespondentEmail = this.responseForm.value.email;
      this.model.otp = this.responseForm.value.otp;
      this.model.complaintType = this.ComplaintTypeId;

      try {

        this.response = await this.homeService.RespondantResponsePostWebSite(
          this.model,
          this.responseForm.value.Id,
          this.responseForm.value.ComplaintNumberPartial
        );

        if (this.response.data == null) {
          alert("OTP is not valid. Please try again.");
        } else {
          this.responseForm.reset();
          this.CloseModalPopup();
          window.location.reload();
        }


      } catch (error) {
        console.error("Error:", error);
      }

    }
    else {
      this.isOtpValid = false;
      this.SendMessageOTP = "";
      this.ErrorMessageOTP = "The OTP you entered is invalid.";
    }
    console.log(this.responseForm.value);


  }

  onPageSizeChange(event: any) {
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.calculatePagination();
  }
  firstPage() {
    this.currentPage = 1;
    this.updatePagedData();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.updatePagedData();
  }

  onFileChange(event: any) {
    debugger;

    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log("Selected File:", this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }
  async uploadSaveFile() {
    debugger;

    try {
      if (!this.selectedFile) {
        console.error("File is null or not selected");
        alert("Please select a file first");
        return;
      }

      this.response = await this.homeService
        .UploadResponseFilesWebSite(
          this.selectedFile,
          this.TempComplaintNo,
          this.RespondentMobileNo,
          this.RespondentEmail
        )
        .toPromise();


      this.SaveFileTypeNew = this.response.fname;

      console.log("Upload Success:", this.response);

    } catch (error) {
      console.error("Upload Error:", error);
    }
  }




  ShowViewReplyResponse(content: any, item: any) {
    debugger
    // assign values from selected row

    this.TempComplaintNo = item.ComplaintNumber;
    this.GetData_ViewReplyResponse();
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }




  //async GetData_ViewReplyResponse() {
  //  try {

  //    const res :any = await this.homeService.Get_ViewReplyResponse(
  //      this.TempComplaintNo
  //    );

  //    this.responseData = res.Data || [];

  //  } catch (error) {
  //    console.error('Error fetching response:', error);
  //    this.responseData = [];
  //  }
  //}

  async GetData_ViewReplyResponse() {
    try {

      this.loaderService.requestStarted();

      const res: any = await this.homeService.Get_ViewReplyResponse(
        this.TempComplaintNo
      );

      this.responseData = res.Data || [];

    } catch (error) {
      console.error('Error fetching response:', error);
      this.responseData = [];

    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  viewFile(item: any) {
    debugger
    if (!item.filepath) return;

    const fullUrl =
      (item.UserRoleid == 8
        ? '/Content/uploads/ResponseDoc/'
        : '/Content/uploads/ReplyCumHearingResponseDoc/')
      + item.filepath;

    window.open(this.docUrl + fullUrl, '_blank');
  }



  async verifyEmail() {
    this.GetResponseMobileNoWebSite();
  }

  ViewRejoinder(content: any, item: any) {
    debugger
    // assign values from selected row
    this.web_TBL_Rejoinder.ComplaintNumber = item.ComplaintNumber;

    // call API
    this.GetWeb_TBL_Rejoinder();

    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }

  async GetWeb_TBL_Rejoinder() {
    debugger
    try {

      this.loaderService.requestStarted();
      await this.homeService.GetWeb_TBL_RejoinderDetails(this.web_TBL_Rejoinder)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.Web_TBL_RejoinderList = data?.Data ?? [];
          console.log(this.Web_TBL_RejoinderList, "GetWeb_TBL_Rejoinder")
        }, (error: any) => console.error(error)
        );
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

}
