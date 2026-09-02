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

export interface Complaint {
  Id: number;
  Rank: number;
  Complaintno: string;
  ProjectName: string;
  CreatedOn: string;
  AppStatus: string;
}
@Component({
    selector: 'app-home',
  templateUrl: './ViolationofAct.component.html',
  styleUrls: ['./ViolationofAct.component.css'],
    standalone: false
})


export class ViolationofActComponent implements OnInit {
  searchModel = new ViolationofActModel();

  DistrictList: any[] = [];
  complaints: Complaint[] = [];
  YearList: any[] = [];
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

    
  
    await this.GetAgentList();
    this.docUrl = this.commonMasterService.DocUrl;
  }



  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSearch() {
    

    this.GetAgentList();
  }
  clearAll() {
    this.searchModel = new ViolationofActModel();   
    this.complaints = [];  
    this.GetAgentList();
  }

  viewAgent(agent: any) {
    this.routers.navigate(['/ViewAgent'], {
      queryParams: { id: agent.Id }
    });
  }
  async GetAgentList() {
    
    this.complaints = [];          
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();
      this.searchModel.Action = "GetViolationComplaintsListForPublic";
     
      const data: any = await this.HomeService.ViolationofAct(this.searchModel);


      if (data && data.Data && data.Data.length > 0) {
        this.complaints = data.Data;
        this.totalRecords = data.Data.length;
      } else {
        this.complaints = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();
      this.cdr.markForCheck();
    }
    catch (error) {
      console.error(error);
      this.complaints = [];
      this.totalRecords = 0;
    }
    finally {
      this.loaderService.requestEnded(); 
    }
  }


  calculatePagination() {
    this.totalPages = Math.ceil(this.complaints.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProjectList = this.complaints.slice(startIndex, endIndex);

  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }
  get startRecord(): number {
    if (this.complaints.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.complaints.length
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




  viewViolation(complaintId: number) {
   
    const url = this.router.createUrlTree(['/ViolationActSummary'], { queryParams: { ComplaintId: complaintId } });

    window.open(this.router.serializeUrl(url), '_blank');
  }


  //openImages(id: number) {
  //  //this.http.get('/Admin/Complaint/ViewViolationActImages', { params: { Id: id } })
  //  //  .subscribe(res => {

  //  //  });
  //}

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
