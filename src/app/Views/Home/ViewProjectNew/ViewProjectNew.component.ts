import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { GetComplaintsAgainstRespondenSearch, SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF } from '../../../Models/Master';
import { HttpClient } from '@angular/common/http';

import {  ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-ViewProjectNew',
  templateUrl: './ViewProjectNew.component.html',
  styleUrls: ['./ViewProjectNew.component.css'],
    standalone: false
})

export class ViewProjectNewComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  TypeMod: number = 1; 
  sanctionTotalPlots = 0;
  sanctionPlotsBooked = 0;
  documentMasterTypes: string[] = [];
  notSanctionTotalPlots = 0;
  notSanctionPlotsBooked = 0;
  public CampusPostList: any[] = [];
  public agentWebsiteData: any[] = [];
  public PlacementCompanyList: any[] = [];
  public GetComplaintsAgainstRespondentList: any[] = [];
  public qrCode: string = '';
  totalSanctionedApartment = 0;
  isPopupOpen = false;

  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;


  totalProposedNotSanctionedApartment = 0;
  projectModel: any;
  projectId: string = '';
  pid: number = 0;
  type: string = '';
  docUrl: string = "";
  @Input() endPoints: any[] = [];
  public sSOLoginDataModel = new SSOLoginDataModel();
  public request = new ComplaintAdjudicatingPDF();
  public model1 = new ComplaintAdjudicatingOfficerModel();
  public _Search = new GetComplaintsAgainstRespondenSearch();
  cutoffDate = new Date('2024-03-27');
  isApprovedBeforeCutoff = false;
/*  showOldAreaColumns: boolean = false;*/
  totalArea: number = 0;
/*  sendToAdminOn: string = '';*/
  _totalSanctionedApartment: number = 0;
  _totalProposedbutnotsanctionedapartment: number = 0;

  sanctionedApartments: any[] = [];
  notSanctionedApartments: any[] = [];
   sendToAdminOn!: Date;
  sendDate = new Date('2023-10-13');
  showOldColumns: boolean = false;
  projectDocuments: any;
  model: any;
  BankAccount: any;
  ConstructionWork: any;
  projectDetails: any;
  CommonModel: any;
  UnitModel: any;
  Encumbrance: any;
  QPRDetails: any;
  APRDetails: any;
  GetPreviousExtsList: any;
  GetMapRevision: any;
  GetQPRList: any;
  GetAPRList: any;
  GetSpecialModProfileList_New: any;
  GetSpecialModProjectList_New: any;
  GetEncumbranceList_New: any;
  LoanPercentage: number = 0;
  qrCodeImage: string = '';
  public projectStatus: string = '';
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  
  ngOnInit() {
    this.sSOLoginDataModel.DepartmentID = 1;

    sessionStorage.clear();
    localStorage.clear();
    this.route.queryParams.subscribe(async params => {
      this.projectId = params['id'];   
      this.pid = params['id'];   
      this.type = params['type']; 
      this.docUrl = this.commonMasterService.DocUrl;
      if (this.projectId) {
       await this.GetprojectDetailsbyDepecryValue();
        await this.GetprojectDetailsbyDepecryValueCommon("CommonArea");
        await  this.GetprojectDetailsbyDepecryValueUnit("Compliance");
        await  this.GetprojectDetailsbyDepecryValueEncumbrance("Encumbrance");
        await  this.GetprojectDetailsbyDepecryValueQPR("QPRDetails");
        await this.GetprojectDetailsbyDepecryValueAPR("APRDetails");
        //await this.GetprojectDetailsbyDepecryValuebank("BankAccount");
        await this.GetprojectDetailsbyDepecryValueConstructionWork("ConstructionWork");
        await this.loadQrCode(this.projectId);
        this.GetProjectWiseStatusOtherApplication(this.model.ProjectId);
      }
    });

  }

  async GetprojectDetailsbyDepecryValue() {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValue(this.projectId);

     // console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.model = response.Data[0];
      }
      this.Get_ProjectStatus(this.projectId);

     console.log('Model:', this.model);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }

  async GetprojectDetailsbyDepecryValueCommon(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type,this.projectId);

     // console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.CommonModel = response.Data[0];
      }

        //console.log('CommonModel:', this.CommonModel);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }

  async GetprojectDetailsbyDepecryValueUnit(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

  //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.UnitModel = response.Data[0];
      }

    //  console.log('UnitDetails:', this.UnitModel);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }
  async GetprojectDetailsbyDepecryValueEncumbrance(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

      //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.Encumbrance = response.Data[0];
      }
      this.calculateLoanPercentage();
      //console.log('Encumbrance:', this.Encumbrance);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }

  async GetprojectDetailsbyDepecryValueQPR(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

      //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.QPRDetails = response.Data[0];
      }

     // console.log('QPRDetails:', this.QPRDetails);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }
  async Get_ProjectStatus(ProjectId: string) {
    this.loaderService.requestStarted();
    debugger
    try {
      const response: any = await this.homeService.Get_ProjectStatus_Single(ProjectId);

      if (response?.State == 1) {
        this.projectStatus = response.Data[0].PStatus;
        console.log("Status",this.projectStatus);
      } else {
        this.projectStatus = '';

      }
      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    }

    this.loaderService.requestEnded();
  }
  async GetprojectDetailsbyDepecryValueAPR(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

      //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.APRDetails = response.Data[0];
      }
      //console.log('APRDetails:', this.APRDetails);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }
  async GetprojectDetailsbyDepecryValuebank(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

      //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.BankAccount = response.Data[0];
      }
      //console.log('BankAccount:', this.BankAccount);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }
  async GetprojectDetailsbyDepecryValueConstructionWork(type: string) {
    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon(type, this.projectId);

      //    console.log('Response:', response);

      if (response?.Data && response.Data.length > 0) {
        this.ConstructionWork = response.Data;
      }


   //   console.log('ConstructionWork:', this.ConstructionWork);

    } catch (error) {
      console.error(error);
    } finally {
      this.loaderService.requestEnded();
    }
  }

  get constructionData() {
    if (!this.ConstructionWork) {
      return [];
    }

    const blocks = this.ConstructionWork
      .filter((x: any) => x.AppMasterId === 310);

    const commonAmenities = this.ConstructionWork
      .filter((x: any) => x.AppMasterId === 315);

    return [...blocks, ...commonAmenities];
  }

 
  historyList: any[] = [];

  convertMvcDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // MVC format: /Date(1234567890)/
    const mvcMatch = /Date\((\d+)\)/.exec(dateStr);

    if (mvcMatch) {
      return new Date(+mvcMatch[1]);
    }

    // ISO format: 2025-10-14T13:20:00
    const date = new Date(dateStr);

    return isNaN(date.getTime()) ? null : date;
  }

  async GetProjectWiseStatusOtherApplication(ProjectId: number) {
    this.loaderService.requestStarted();
    try {
      const response: any =
        await this.homeService.GetprojectDetailsbyDepecryValueCommon("History", this.projectId);
        if (response?.Data && response.Data.length > 0) {
          this.historyList = response.Data;
          }
     // console.log('History:', this.historyList);

      } catch (error) {
        console.error(error);
      } finally {
        this.loaderService.requestEnded();
      }
  }

  //downloadPdf() {
  //  this.loaderService.requestStarted();
  //  const element = this.pdfContent.nativeElement;

  //  html2canvas(element, {
  //    scale: 2,
  //    useCORS: true,
  //    backgroundColor: '#ffffff'
  //  }).then(canvas => {

  //    const imgData = canvas.toDataURL('image/png');

  //    const pdf = new jsPDF({
  //      orientation: 'portrait',
  //      unit: 'mm',
  //      format: 'a4'
  //    });

  //    const pageWidth = 210;   // A4 Width
  //    const pageHeight = 297;  // A4 Height

  //    const imgWidth = pageWidth;
  //    const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //    let heightLeft = imgHeight;
  //    let position = 0;

  //    pdf.addImage(
  //      imgData,
  //      'PNG',
  //      0,
  //      position,
  //      imgWidth,
  //      imgHeight,
  //      '',
  //      'FAST'
  //    );

  //    heightLeft -= pageHeight;

  //    while (heightLeft > 0) {
  //      position = -(imgHeight - heightLeft);

  //      pdf.addPage();

  //      pdf.addImage(
  //        imgData,
  //        'PNG',
  //        0,
  //        position,
  //        imgWidth,
  //        imgHeight,
  //        '',
  //        'FAST'
  //      );

  //      heightLeft -= pageHeight;
  //    }

  //    pdf.save('ProjectDetails.pdf');
  //  });

  //  this.loaderService.requestEnded();
  //}



  //downloadPdf() {
  //  this.loaderService.requestStarted();

  //  const element = this.pdfContent.nativeElement;

  //  element.classList.add('pdf-export');

  //  setTimeout(() => {

  //    html2canvas(element, {
  //      scale: 1,
  //      useCORS: true,
  //      backgroundColor: '#ffffff'
  //    }).then(canvas => {

  //      const pdf = new jsPDF('p', 'mm', 'a4');

  //      const imgData = canvas.toDataURL('image/jpeg', 0.7);

  //      const pageWidth = pdf.internal.pageSize.getWidth();
  //      const pageHeight = pdf.internal.pageSize.getHeight();

  //      const imgWidth = pageWidth;
  //      const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //      let heightLeft = imgHeight;
  //      let position = 0;

  //      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

  //      heightLeft -= pageHeight;

  //      while (heightLeft > 0) {
  //        position = heightLeft - imgHeight;

  //        pdf.addPage();
  //        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

  //        heightLeft -= pageHeight;
  //      }

  //      pdf.save('ProjectDetails.pdf');

  //      element.classList.remove('pdf-export');
  //      this.loaderService.requestEnded();

  //    }).catch(() => {
  //      element.classList.remove('pdf-export');
  //      this.loaderService.requestEnded();
  //    });

  //  }, 100);
  //}

  downloadPdf() {
    this.loaderService.requestStarted();

    const element = this.pdfContent.nativeElement;

    element.classList.add('pdf-export');

    setTimeout(() => {

      html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {

        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/jpeg', 0.7);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const generatedOn = new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        let heightLeft = imgHeight;
        let position = 0;
        let pageNo = 1;

        // First page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

        pdf.setFontSize(8);
        pdf.text(`Generated On: ${generatedOn}`, 10, 8);
        pdf.text(`Page ${pageNo}`, pageWidth - 20, 8);

        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;

          pdf.addPage();
          pageNo++;

          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

          pdf.setFontSize(8);
          pdf.text(`Generated On: ${generatedOn}`, 10, 8);
          pdf.text(`Page ${pageNo}`, pageWidth - 20, 8);

          heightLeft -= pageHeight;
        }

        pdf.save('ProjectDetails.pdf');

        element.classList.remove('pdf-export');
        this.loaderService.requestEnded();

      }).catch(() => {
        element.classList.remove('pdf-export');
        this.loaderService.requestEnded();
      });

    }, 100);
  }
  calculateLoanPercentage(): void {

    const loanAmount = Number(this.Encumbrance?.LOAN_EXISTING_PROPOSED || 0);
    const totalCost = Number(this.model?.TotalCost || 0);

    if (loanAmount === 0 || totalCost === 0) {
      this.LoanPercentage = 0;
      return;
    }

    this.LoanPercentage = Number(
      ((loanAmount / totalCost) * 100).toFixed(2)
    );
  }

  loadQrCode(id: string) {
    this.homeService.getProjectQrCodeSingle(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.qrCodeImage = res.qrCode;
        }
      },
      error: (err) => {
        console.error('QR Code Error:', err);
      }
    });
  }
}
