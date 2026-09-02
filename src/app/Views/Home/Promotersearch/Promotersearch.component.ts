import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { AgentSearchModel, ComplaintdetailsSearchModel } from '../../../Models/Master';


@Component({
    selector: 'app-home',
  templateUrl: './Promotersearch.component.html',
  styleUrls: ['./Promotersearch.component.css'],
    standalone: false
})

export class PromotersearchComponent implements OnInit {
  searchModel = new ComplaintdetailsSearchModel();

  DistrictList: any[] = [];
  filters: any = {};
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  promoters: any[] = [];
  ComplaintDataModel: any[] = [];

  DashBoardstatus: string = '';
  name: string = '';
  UserType: number = 1;
  PanNumber: string = '';
  district: number = 0;
  username: string = '';
  sso: string = '';
  email: string = '';
  mobileno: string = ''

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.filters = {
      UserType: 1,
      name: '',
      PanNumber: '',
      sso: '',
      email: '',
      mobileno: '',
      UserName: '',
      District: 0, // Optional
    };
    
    this.GetComplainantList();

    
    //this.route.queryParams.subscribe(params => {
    //  this.searchModel.compalaint_no = params['compalaint_no'] || 0;
    //  this.searchModel.complaint_status = params['complaint_status'] || 0;
    //  this.searchModel.complainant = params['complainant'] || null;
    //  this.searchModel.respondent_name = params['respondent_name'] || null;
      
    //  if (this.searchModel.compalaint_no != "") {
    //    this.onSearch();
    //  } else {
    //    
    //  }
     
      
      
    //});
  }


  //onSearch() {
  //  this.filters.UserType
  //  this.GetComplainantList();
  //}
  async onSearch() {
    debugger
    this.ProjectList = [];
    this.totalRecords = 0;

    try {
      const data: any = await this.HomeService.GetUserDetailsWebsite(
        '', // DashBoardstatus
        this.filters.name || '',
        this.filters.UserType || 0,
        this.filters.PanNumber || '',
        this.filters.District || 0,
        this.filters.UserName || '',
        this.filters.sso || '',
        this.filters.email || '',
        this.filters.mobileno || ''
      );

      if (data && Array.isArray(data) && data.length > 0) {
        this.ProjectList = data;
        this.totalRecords = data.length;
      } else {
        this.ProjectList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('API Error:', error);
      this.ProjectList = [];
      this.totalRecords = 0;
    }
  }

  clearAll() {

    this.filters = [];
    this.searchModel = new ComplaintdetailsSearchModel();
    this.TehsilList = [];
    this.GetComplainantList();
    this.filters = {
      UserType: 1,
      name: '',
      PanNumber: '',
      sso: '',
      email: '',
      mobileno: '',
      UserName: '',
      District: 0, // Optional
    };
  }

  async GetComplainantList() {
    //debugger;

    this.ProjectList = [];
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();

      const data: any = await this.HomeService.GetUserDetailsWebsite(
        this.DashBoardstatus,
        this.name,
        this.UserType,
        this.PanNumber,
        this.district,
        this.username,
        this.sso,
        this.email,
        this.mobileno
      );

      console.log('API Response:', data);

      if (data && Array.isArray(data) && data.length > 0 && data) {
        this.ProjectList = data;
        this.totalRecords = data.length;
      } else {
        this.ProjectList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();
      this.cdr.markForCheck();
    }
    catch (error) {
      console.error('API Error:', error);
      this.ProjectList = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 1000);
    }
  }



  calculatePagination() {
    this.totalPages = Math.ceil(this.ProjectList.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    //debugger
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.promoters = this.ProjectList.slice(startIndex, endIndex);
    //this.cdr.detectChanges();
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
 
  //viewDoc(row: any) {
    
  //  const type = row.UserType === 'Agent' ? 1 : 2;

  //  this.router.navigate(
  //    ['/Summary'],
  //    {
  //      queryParams: {
  //        userId: row.UserId,
  //        type: type,
  //        typemode: row.typemode ?? 0,
  //        PNR: row.PNR ?? ''
  //      }
  //    }
  //  );
  //}

  GotoMyProfile(row: any) {
    //debugger
    //this.router.navigate(
    //  ['/MyProfile'],
    //  {
    //    queryParams: {
    //      profileType:  0,
    //      tabId:  0,
    //      message: null,
    //      TypeMod: 1,
    //      paramCurrentUserId: row.UserId ?? 0,
    //      AppNo: null
    //    }
    //  }
    //);
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
