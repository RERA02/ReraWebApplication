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
    selector: 'app-home',
  templateUrl: './APRSummary.component.html',
  styleUrls: ['./APRSummary.component.css'],
    standalone: false
})

export class APRSummaryComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  DistrictList: any[] = [];
  YearList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  projectId: string = "";
  QID: string = "";
  model: any;
  financialYear: string = '';
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.projectId = params['projectId'];
        this.QID = params['QID'];

      });
    
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetAPRSummaryList();
    this.cdr.markForCheck();
  }
  async GetAPRSummaryList() {
    debugger
    this.model = null;  
    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.GetAPRSummaryWebSite(this.projectId, this.QID);

      console.log('API Response:', data);

      if (data) {
        this.model = data.data;
        this.financialYear = this.model?.FinYearName;
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

  convertDotNetDate(dateString: string): string {
    if (!dateString) return '';

    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateString);
    if (!match) return '';

    const date = new Date(Number(match[1]));

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  datesChange(dateString: string): string {
    if (!dateString) return '';

    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateString);
    if (!match) return '';

    const date = new Date(Number(match[1]));

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
