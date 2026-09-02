import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { AgentSearchModel } from '../../../Models/Master';


@Component({
  selector: 'app-home',
  templateUrl: './AgentList.component.html',
  styleUrls: ['./AgentList.component.css'],
  standalone: false
})

export class AgentListComponent implements OnInit {
  searchModel = new AgentSearchModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.loaderService.requestStarted();
    this.route.queryParams.subscribe(params => {
      this.searchModel.districtId = params['districtId'] || 0;
      this.searchModel.tehsilId = params['tehsilId'] || 0;
      this.searchModel.agentName = params['agentName'] || null;
      this.searchModel.registrationNo = params['registrationNo'] || null;
      this.GetComponentsNew();
      this.GetAgentList();
      debugger
      if (this.searchModel.districtId !== null && this.searchModel.districtId > 0) {
        this.onDistrictChange();
      }

    });
  }

  async GetComponentsNew() {
    try {
      this.loaderService.requestStarted();
      await this.commonMasterService.GetComponentsNew(18, 2)
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
  onDistrictChange() {
    debugger
    const districtId = this.searchModel.districtId;

    if (districtId) {
      this.GetComponentsNewTeshil(districtId);
    } else {
      this.TehsilList = [];
    }
  }
  async GetComponentsNewTeshil(districtId: number) {
    debugger;
    try {
      this.loaderService.requestStarted();
      await this.commonMasterService.GetComponentsNewteshil(districtId, 3)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          this.TehsilList = data['Data'];
          console.log(this.TehsilList, "TehsilList");
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

  onSearch() {
    const params: any = {};

    Object.keys(this.searchModel).forEach(key => {
      const val = (this.searchModel as any)[key];
      if (val && val !== 0) {
        params[key] = val;
      }
    });

    this.GetAgentList();
    this.cdr.markForCheck();
  }
  clearAll() {
    this.searchModel = new AgentSearchModel();
    this.TehsilList = [];
    this.ProjectList = [];
    this.GetAgentList();
  }

  //viewAgent(agent: any) {
  //  this.routers.navigate(['/ViewAgent'], {
  //    queryParams: { id: agent.Id }
  //  });
  //}
  async GetAgentList() {
    this.ProjectList = [];
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();

      const data: any = await this.HomeService.GetAgentList(this.searchModel);

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
      this.cdr.markForCheck();
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
    this.cdr.detectChanges();
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

  ViewAgent(ID: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['/ViewAgent'],
        { queryParams: { id: ID } }
      )
    );

    window.open(url, '_blank');
  }


  async UploadedCertificatePath(ID: number) {
    debugger
    try {

      this.loaderService.requestStarted();
      //var url = "https://rera.rajasthan.gov.in/Home/DownloadAgentCertificate?UserId=" + ID
      const url = `${this.commonMasterService.DocUrl}Home/DownloadAgentCertificate?UserId=${ID}`;
      const win = window.open(url, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      this.loaderService.requestEnded();
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
