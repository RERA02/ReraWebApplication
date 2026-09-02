import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { GetUploadedDocumentsSPModel, ViolationofActModel } from '../../../Models/Master';


@Component({
    selector: 'app-home',
  templateUrl: './ViolationActSummary.component.html',
  styleUrls: ['./ViolationActSummary.component.css'],
    standalone: false
})


export class ViolationActSummaryComponent implements OnInit {
  searchModel = new ViolationofActModel();

  DistrictList: any[] = [];
  model: any;
  DocumentList: any;
  compid: number = 0;
  YearList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.compid = +params['ComplaintId'] || 0;
      if (this.compid) {
        this.GetAgentList(this.compid);
        this.GetDocumentList(this.compid);
      }
    });
  
    
    this.docUrl = this.commonMasterService.DocUrl;
    this.cdr.markForCheck();
  }



  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  //onSearch() {
    

  //  this.GetAgentList();
  //}
  clearAll() {
    this.searchModel = new ViolationofActModel();   
    this.model = [];  
    //this.GetAgentList();
  }


  async GetAgentList(id: number) {
    
    this.model = [];          
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();
      
     
      const data: any = await this.HomeService.ViolationActSummaryWebsite(id);

      
      if (data) {
        this.model = data;
        //this.totalRecords = data.Data.length;
      } else {
        this.model = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
     // this.calculatePagination();
    }
    catch (error) {
      console.error(error);
      this.model = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
        this.cdr.detectChanges(); 
      });
    }
  }

  async GetDocumentList(id: number) {

    this.DocumentList = [];
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();


      const data: any = await this.HomeService.GetViolationComplaintImagesWebsite(id);

      
      if (data) {
        this.DocumentList = data;
        this.totalRecords = this.DocumentList.length;
      } else {
        this.DocumentList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
       this.calculatePagination();
    }
    catch (error) {
      console.error(error);
      this.DocumentList = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
        this.cdr.detectChanges();
      });
    }
  }
  calculatePagination() {
    this.totalPages = Math.ceil(this.DocumentList.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProjectList = this.DocumentList.slice(startIndex, endIndex);

  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }
  get startRecord(): number {
    if (this.DocumentList.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.DocumentList.length
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

  ViewAgent(ID: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['/ViewAgent'],
        { queryParams: { id: ID } }
      )
    );

    window.open(url, '_blank');
  }





  getDocumentUrl(item: any): string {
    if (!item.DOCUMENT) return '';
    if (item.Status === 100 && item.TYPEFOR === 5 && item.CREATEDBY === 'Promoter') {
      return item.DOCUMENT.replace('../', '');
    }
    return '/Content/uploads/AuditDoc/' + item.DOCUMENT;
  }


  convertMvcDate(dateStr: string): Date | null {

    if (!dateStr) return null;

    const matches = /Date\((\d+)\)/.exec(dateStr);

    return matches ? new Date(+matches[1]) : null;
  }

  getImageUrl(path: string): string {

    if (!path) return '';

    let url = path.substring(2);

    return this.docUrl + url;
  }

}
