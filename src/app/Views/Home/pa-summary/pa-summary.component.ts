import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  selector: 'app-pa-summary',
  standalone: false,
  templateUrl: './pa-summary.component.html',
  styleUrl: './pa-summary.component.css'
})
export class PASummaryComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  CC: any[] = [];
  LstPAPartialCCl: any[] = [];
  OC: any[] = [];
  Insurance: any[] = [];
  RWA: any[] = [];
  R1R2R3: any[] = [];
  OtherDoc: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  PID: string = "";
  ApplicationID: string = "";
  model: any;


  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }


  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.PID = params['ProjectId'];
      this.ApplicationID = params['ApplicationID'];
     
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetPA_SummaryWebSite();
    this.cdr.markForCheck();
  }

  async GetPA_SummaryWebSite() {
    debugger
    this.model = null;

    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.PASummaryWebSite(this.PID , this.ApplicationID);
      console.log('API Response:', data);
      if (data) {
        this.model = data.data;
        this.LstPAPartialCCl = data.LstPAPartialCClstmodel1;
        const list = this.model?.LstAddprojectdocumenttypes || [];

        this.CC = list.filter((x: any) => x.documentid === 6);
        this.OC = list.filter((x: any) => x.documentid === 7);
        this.Insurance = list.filter((x: any) => x.documentid === 8);
        this.RWA = list.filter((x: any) => x.documentid === 9);
        this.R1R2R3 = list.filter((x: any) => x.documentid === 3);
        this.OtherDoc = list.filter((x: any) => x.documentid === 12);

        console.log(this.CC);
        this.cdr.markForCheck();
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

  getFileUrl(path: string): string {
    debugger;
    if (!path) return '';
    return this.docUrl + '../../' + path.replace('~/', '').replace('../', '');
  }

  formatDate(dateStr: any): Date | null {

    if (!dateStr) return null;

    dateStr = dateStr.toString().trim();

    const defaultDate = new Date(1900, 0, 1);


    if (/^-?\d+$/.test(dateStr)) {
      const num = Number(dateStr);
      return num <= 0 ? defaultDate : new Date(num);
    }


    const mvcMatch = /Date\((\-?\d+)\)/.exec(dateStr);
    if (mvcMatch) {
      const num = Number(mvcMatch[1]);
      return num <= 0 ? defaultDate : new Date(num);
    }


    const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
    if (slashMatch) {
      return new Date(
        Number(slashMatch[3]),
        Number(slashMatch[2]) - 1,
        Number(slashMatch[1])
      );
    }


    const dashMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateStr);
    if (dashMatch) {
      return new Date(
        Number(dashMatch[3]),
        Number(dashMatch[2]) - 1,
        Number(dashMatch[1])
      );
    }


    const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
    if (ymdMatch) {
      return new Date(
        Number(ymdMatch[1]),
        Number(ymdMatch[2]) - 1,
        Number(ymdMatch[3])
      );
    }


    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? defaultDate : parsed;
  }


}
