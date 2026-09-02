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
  templateUrl: './CauseList.component.html',
  styleUrls: ['./CauseList.component.css'],
    standalone: false
})

export class CauseListComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeListTypeEnc: string = "";
  causeType: number = 0;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.route.queryParams.subscribe(async params => {

      this.causeListTypeEnc = params['causeListType'];
      debugger
      if (this.causeListTypeEnc == 'ZxrtLuiayuo')
      {

        this.searchModel.causeListType = 2;
        this.causeType = 2;
      }

      if (this.causeListTypeEnc == 'pZxrtLuiayuo') {

        this.searchModel.causeListType = 1;
        this.causeType = 1;
      }

      //this.searchModel.causeListType = 


      //this.causeType = Number(params['causeListType']);

      await this.GetAgentList();   

    });

    this.docUrl = this.commonMasterService.DocUrl;
  }





  onSearch() {
    

    this.GetAgentList();
  }
  clearAll() {
    this.searchModel = new GetUploadedDocumentsSPModel();
    this.TehsilList = [];
    this.ProjectList = [];
    this.searchModel.causeListType = this.causeType;
    this.GetAgentList();
  }

  viewAgent(agent: any) {
    this.routers.navigate(['/ViewAgent'], {
      queryParams: { id: agent.Id }
    });
  }
  async GetAgentList() {
    this.ProjectList = [];          
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();
     
      this.searchModel.id = 1;
      const data: any = await this.HomeService.GetCauseList(this.searchModel);

      console.log('API Response:', data);

      if (data && data.Data && data.Data.length > 0) {
        this.ProjectList = data.Data;
        this.totalRecords = data.Data.length;
      } else {
        this.ProjectList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();
    }
    catch (error) {
      console.error(error);
      this.ProjectList = [];
      this.totalRecords = 0;
    }
    finally {
      this.loaderService.requestEnded(); 
    }
  }


  calculatePagination() {
    this.totalPages = Math.ceil(this.ProjectList.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProjectList = this.ProjectList.slice(startIndex, endIndex);
    this.cdr.markForCheck();

  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }
  get startRecord(): number {
    if (this.ProjectList.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.ProjectList.length
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

  

}
