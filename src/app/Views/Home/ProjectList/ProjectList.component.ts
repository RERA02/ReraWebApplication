import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ProjectSearchModel } from '../../../Models/Master';


@Component({
    selector: 'app-home',
  templateUrl: './ProjectList.component.html',
  styleUrls: ['./ProjectList.component.css'],
    standalone: false
})

export class ProjectListComponent implements OnInit {
  searchModel = new ProjectSearchModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  count: any;
  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
 
    this.loaderService.requestStarted();
    debugger
    this.route.queryParams.subscribe(async params => {
      this.searchModel.districtId = params['districtId'] || 0;
      this.searchModel.tehsilId = params['tehsilId'] || 0;
      this.searchModel.projectName = params['projectName'] || null;
      this.searchModel.promoterName = params['promoterName'] || null;
      this.searchModel.status = params['status'] || 0;
      this.searchModel.registrationNo = params['registrationNo'] || null;
      this.searchModel.projectType = params['projectType'] || 0;

      if (this.searchModel.status == 6) {
        await this.GetVistorCount("InsertSuspedVistorCount");
        await this.GetVistorCount("SuspedVistorCount");
      }

      await this.GetComponentsNew();
      await this.GetProjectList();
     
      //if (this.searchModel.tehsilId !=0) {
      //  this.GetComponentsNewTeshil(this.searchModel.districtId)
      //}
      if (this.searchModel.districtId != null) {
        this.GetComponentsNewTeshil(this.searchModel.districtId);
      }
      //if (this.searchModel.tehsilId != 0 && this.searchModel.districtId != null) {
      //  this.GetComponentsNewTeshil(this.searchModel.districtId);
      //}
      this.cdr.markForCheck();
    });
  }

  async GetComponentsNew() {
    try {
      debugger
      await this.commonMasterService.GetComponentsNew(18,2)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          //console.log(data);
          this.DistrictList = data['Data'];
          console.log(this.DistrictList, "DistrictList")
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

  async GetVistorCount(Actionname: string) {
    try {
      debugger
      await this.commonMasterService.GetVistorCount(Actionname)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          //console.log(data);
          this.count = data['Data'];
          console.log("Count", data['Data'])
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
  onDistrictChange(event: any) {
  debugger
    const districtId = event.target.value;

    if (districtId && districtId > 0) {
      this.GetComponentsNewTeshil(districtId);
    } else {
      this.TehsilList = [];
      this.searchModel.tehsilId = 0;
    }
  }
  async GetComponentsNewTeshil(districtId: number) {
    debugger
    try {
      await this.commonMasterService.GetComponentsNewteshil(districtId, 3)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          this.TehsilList = data['Data'];
          console.log(this.TehsilList, "TehsilList");
          this.cdr.markForCheck();
          //this.searchModel.tehsilId = this.searchModel.tehsilId;
        
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

  async onSearch() {
    const params: any = {};

    Object.keys(this.searchModel).forEach(key => {
      const val = (this.searchModel as any)[key];
      if (val && val !== 0) {
        params[key] = val;
      }
    });
    if (this.searchModel.status == 6) {
      await this.GetVistorCount("InsertSuspedVistorCount");
      await this.GetVistorCount("SuspedVistorCount");
    }

    this.GetProjectList();
    
  }
  clearAll() {

    this.searchModel = new ProjectSearchModel();
    this.TehsilList = [];
    this.ProjectList = [];

    this.searchModel.districtId = 0;
    this.searchModel.tehsilId = 0;
    this.searchModel.projectName = null;
    this.searchModel.promoterName = null;
    this.searchModel.status = 0;
    this.searchModel.year = 0;

    this.GetProjectList();

  }

  viewProject(project: any) {
    this.routers.navigate(['/ProjectDetail'], {
      queryParams: { id: project.EncryptedProjectId }
    });
  }
  //async GetProjectList() {
  //  try {
  //    debugger
  //    this.HomeService.GetProjectList(this.searchModel)
  //      .then((data: any) => {
  //        data = JSON.parse(JSON.stringify(data));


  //        if (data && data.Data && data.Data.length > 0) {
  //          this.ProjectList = data.Data;
  //          this.totalRecords = data.Data.length;
  //        }
  //        else {
  //          this.ProjectList = [];
  //          this.totalRecords = 0;
  //        }
  //        this.currentPage = 1;
  //        this.calculatePagination();
  //        console.log(this.ProjectList);
  //        this.cdr.markForCheck();
  //      },
  //        (error: any) => console.error(error));
  //  }
  //  catch (ex) {
  //    console.log(ex);
  //  }
  //  finally {
  //    this.loaderService.requestEnded(); // stop loader
  //  }
  //}


  async GetProjectList() {
    try {
      debugger;

      const data: any = await this.HomeService.GetProjectList(this.searchModel);

      const result = data?.Data || [];

      if (result.length > 0) {
        this.ProjectList = result;
        this.totalRecords = result.length;
      } else {
        this.ProjectList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();

      console.log(this.ProjectList);

      this.cdr.markForCheck();   // change detection
    }
    catch (error) {
      console.error(error);
      this.ProjectList = [];
      this.totalRecords = 0;
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
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
    //this.cdr.markForCheck();

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
