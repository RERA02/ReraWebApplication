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
  templateUrl: './UpdatedDailyCauseList.component.html',
  styleUrls: ['./UpdatedDailyCauseList.component.css'],
    standalone: false
})

export class UpdatedDailyCauseListComponent implements OnInit {
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
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.searchModel.OrderfromDate = this.getTodayDate();
    this.searchModel.OrdertoDate = this.getTodayDate();
  
    await this.GetAgentList();
    this.docUrl = this.commonMasterService.DocUrl;
    this.cdr.markForCheck();
  }



  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSearch() {
    

    this.GetAgentList();
  }
  clearAll() {
    this.searchModel = new GetUploadedDocumentsSPModel();   
    this.ProjectList = [];  
    this.GetAgentList();
  }

  viewAgent(agent: any) {
    this.routers.navigate(['/ViewAgent'], {
      queryParams: { id: agent.Id }
    });
  }
  async GetAgentList() {
    debugger
    this.ProjectList = [];          
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();
     
      
      const data: any = await this.HomeService.GetUpdatedDailyCauseListbyparameter();

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


  //async UploadedCertificatePath(ID: number) {
  //  debugger
  //  try {
     
  //    this.loaderService.requestStarted();     
  //    var url = "https://rera.rajasthan.gov.in/Home/DownloadAgentCertificate?UserId=" + ID
  //    const win = window.open(url, '_blank');
  //  } catch (err) {
  //    console.error(err);
  //  } finally {
  //    this.loaderService.requestEnded();
  //  }
  //}


  async GetYear() {
    debugger;
    try {
      this.loaderService.requestStarted();
      await this.commonMasterService.getYear()
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          this.YearList = data['Data'];
          console.log(this.YearList, "YearList");
        }, (error: any) => console.error(error));
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
