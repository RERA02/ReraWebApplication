import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { GetUploadedDocumentsSPModel } from '../../../Models/Master';


@Component({
  selector: 'app-home',
  templateUrl: './ProModSummary.component.html',
  styleUrls: ['./ProModSummary.component.css'],
  standalone: false
})

export class ProModSummaryComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  DistrictList: any[] = [];
  payList: any[] = [];
  YearList: any[] = [];
  ProjectList: any[] = [];
  GetProModPlotList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  ID: string = "";
  model: any;
  PlotDtlmodel: any;
  PvGetProModParking: any;
  PvProModLitigation: any;
  PvGetPromodViewBuild: any;
  PvProModConsultant: any;
  //pv_Id: number = 0;
  //pv_PROJECTID: number = 0;
  //pv_Type: number = 0;
  //Admin: number = 0;

  isReadOnly = true;
  constructor(
    private router: Router,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(params => {
      this.ID = params['ID'];
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetProModSummaryWebSite();

  }

  async GetProModSummaryWebSite() {

    this.model = null;

    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.ProModSummaryWebSite(this.ID);
      console.log('API Response:', data);
      if (data) {
        this.model = data;
        this.payList = this.model?._pay;

      } else {
        this.model = null;
      }
    }
    catch (error) {
      console.error(error);
      this.model = null;
    }
    finally {
      this.loaderService.requestEnded();
    }
  }

  getProjectCertificateUrl(path: string): string {
    if (!path) return '';

    return path.startsWith('~')
      ? this.docUrl + path.substring(1)
      : this.docUrl + path;
  }



  viewBuild(id: string, projectId: string, type: number) {

    this.router.navigate(['/build-details'], {
      queryParams: {
        id: id,
        projectId: projectId,
        type: type
      }
    });

  }
  viewBuildC(id: string, projectId: string, type: number) {

    this.router.navigate(['/consultant-details'], {
      queryParams: {
        id: id,
        projectId: projectId,
        type: type
      }
    });

  }


  convertDotNetDate(dateString: string): Date | null {
    if (!dateString) return null;

    const match = /\/Date\((\d+)\)\//.exec(dateString);
    return match ? new Date(+match[1]) : null;
  }

  getOtherPromoterNames(): string {
    if (!this.model?._promterLstOLD || this.model._promterLstOLD.length === 0) {
      return '';
    }

    return this.model._promterLstOLD
      .map((p: any) => p.Name)
      .filter((name: string) => name)   // remove null/empty names
      .join(', ');
  }


  Show_GetPlotDtlView(content: any, pv_Id: number, pv_PROJECTID: number, pv_Type: number, Admin: number = 1) {

    // assign values from selected row

    this.pvGetPlotDtl(pv_Id, pv_PROJECTID, pv_Type, Admin);


    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }

  async CloseModalPopup1() {
    this.modalService.dismissAll();
  }






  isChecked(chkValue: number): boolean {
    return chkValue !== 0;
  }

  getDocumentLink(doc: string | null): { href: string, target: string } | null {
    if (!doc) return null;

    // Remove leading "~" if exists (like in Razor)
    const href = doc.startsWith('~') ? doc.slice(1) : doc;

    return {
      href: '/Content/uploads/SpclProMod/' + href,
      target: '_blank'
    };
  }

  pvGetPlotDtl(pv_Id: number, pv_PROJECTID: number, pv_Type: number, Admin: number = 1) {
    try {
      debugger
      this.loaderService.requestStarted();
      this.HomeService.GetPlotDtlView(pv_Id, pv_PROJECTID, pv_Type, Admin)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.PlotDtlmodel = data;
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

  getFullUrl(item: any): string {
    // Check if item.URL exists, otherwise return '#'
    if (item?.URl) {
      return this.docUrl + item.URl.replace('..', '');
    }
    return '#';
  }

  getdoc1Url(path: string, folder: string = 'SpclProMod'): { href: string, target: string } | null {

    if (!path) return null;

    const cleanPath = path.startsWith('~') ? path.substring(1) : path;

    // Ensure single slash
    const href = `${this.docUrl}/Content/uploads/${folder}/${cleanPath}`;

    return { href, target: '_blank' };
  }

  // Only the base URL


  openDocument(item: any) {
    debugger
    // Check if document exists and chk1 is valid
    if (item?.doc1 && item.chk1 !== 0) {
      // Ensure the file path is clean and build the full URL
      const filePath = item.doc1.startsWith('..') ? item.doc1.substring(2) : item.doc1;
      const fullUrl = `${this.docUrl}/Content/uploads/SpclProMod/${filePath}`;
      // Open the document in a new tab
      window.open(fullUrl, '_blank');
    } else {
      console.warn('Document not available');
    }
  }

  openDocument1(fileName: string | null) {
    if (fileName) {
      // Remove leading '..' if present
      const cleanFile = fileName.startsWith('..') ? fileName.substring(2) : fileName;
      const fullUrl = `${this.docUrl}/Content/uploads/SpclProMod/${cleanFile}`;
      window.open(fullUrl, '_blank'); // Open in new tab
    } else {
      console.warn('Document not available');
    }
  }


  openContent(fileName: string | null) {
    debugger
    if (fileName) {
      // Remove leading '..' if present
      const cleanFile = fileName.startsWith('..') ? fileName.substring(2) : fileName;
      let fullUrl = "";
      if (cleanFile.toLowerCase().includes('uploads/')) {
         fullUrl = `${this.docUrl}/Content/${cleanFile}`;
      }
      else if (cleanFile.toLowerCase().includes('projectcommanarea/')) {
         fullUrl = `${this.docUrl}/Content/${cleanFile}`;
      }
      else {
         fullUrl = `${this.docUrl}/Content/uploads/${cleanFile}`;
      }




      window.open(fullUrl, '_blank'); // Open in new tab
    } else {
      console.warn('WaterSupply_old document not available');
    }
  }

  Show_ViewLitigationP(content: any, pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    debugger
    // assign values from selected row

    this.pvGetProModParking(pv_Id, pv_PROJECTID, pv_Type);


    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }

  pvGetProModParking(pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    try {
      debugger
      this.loaderService.requestStarted();
      this.HomeService.GetProModParking(pv_Id, pv_PROJECTID, pv_Type)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.PvGetProModParking = data;
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

  getTotal(field: string): number {
    if (!this.PvGetProModParking?.parkingModel) return 0;

    return this.PvGetProModParking?.parkingModel.reduce((sum: number, item: any) => {
      return sum + (Number(item[field]) || 0);
    }, 0);
  }


  Show_ViewLitigation(content: any, pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    debugger
    // assign values from selected row

    this.pvGetProModLitigation(pv_Id, pv_PROJECTID, pv_Type);


    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }



  pvGetProModLitigation(pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    try {
      debugger
      this.loaderService.requestStarted();
      this.HomeService.GetProModLitigation(pv_Id, pv_PROJECTID, pv_Type)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.PvProModLitigation = data._mod;
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



  Show_viewBuild(content: any, pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    debugger
    // assign values from selected row

    this.pvGetPromodViewBuild(pv_Id, pv_PROJECTID, pv_Type);


    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }


  pvGetPromodViewBuild(pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    try {
      debugger
      this.loaderService.requestStarted();
      this.HomeService.GetPromodViewBuild(pv_Id, pv_PROJECTID, pv_Type)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.PvGetPromodViewBuild = data;
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


  Show_ViewBuildC(content: any, pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    debugger
    // assign values from selected row

    this.pvGetViewBuildC(pv_Id, pv_PROJECTID, pv_Type);


    // open modal
    this.modalService.open(content, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
  }


  pvGetViewBuildC(pv_Id: number, pv_PROJECTID: number, pv_Type: number) {
    try {
      debugger
      this.loaderService.requestStarted();
      this.HomeService.GetProModConsultant(pv_Id, pv_PROJECTID, pv_Type)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.PvProModConsultant = data;
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
