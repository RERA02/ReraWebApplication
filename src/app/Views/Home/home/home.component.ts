import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { AgentSearchModel, ComplaintdetailsSearchModel, ProjectSearchModel } from '../../../Models/Master';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})

export class HomeComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public DistrictList: any[] = [];
  public AgentDistrictList: any[] = [];
  public PlacementCompanyList: any[] = [];
  public TehsilList: any[] = [];
  public AgentTehsilList: any[] = [];
  public sSOLoginDataModel = new SSOLoginDataModel();
  public selectedDistrictId: number = 0;
  public selectedTehsilId: number = 0;
  searchModel: ProjectSearchModel = new ProjectSearchModel();
  AgentsearchModel: AgentSearchModel = new AgentSearchModel();
  _ComplaintdetailsSearchModel = new ComplaintdetailsSearchModel();
  public CountList: any[] = [];
  PromoterCount: number = 0;
  ProjectCount: number = 0;
  AgentCount: number = 0;
  ComplaintCount: number = 0;
  public judgementList: any[] = [];

  constructor(private cdr: ChangeDetectorRef, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {

   
    this.sSOLoginDataModel.DepartmentID = 1;
    //await this.GetAllPost();
    //sessionStorage.clear();
    //localStorage.clear();
    await this.GetComponentsNew();
    await this.DashboardCount();
    this.cdr.markForCheck();
    //this.TestDashboardCount();

  }




  async GetComponentsNew() {
    try {
      await this.commonMasterService.GetComponentsNew(18, 2)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          //console.log(data);
          this.DistrictList = data['Data'];
          this.AgentDistrictList = data['Data'];
          

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
    const districtId = event.target.value;
    debugger
    if (districtId && districtId > 0) {
      this.GetComponentsNewTeshil(districtId);
    } else {
      this.TehsilList = [];
      this.searchModel.tehsilId = 0;
    }
  }
  onAgentDistrictChange(event: any) {
    const districtId = event.target.value;

    if (districtId && districtId > 0) {
      this.GetComponentsNewTeshilAgent(districtId);
    } else {
      this.TehsilList = [];
    }
  }
  async GetComponentsNewTeshil(districtId: number) {
    ;
    try {
      await this.commonMasterService.GetComponentsNewteshil(districtId, 3)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          this.TehsilList = data['Data'];
          
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
  async GetComponentsNewTeshilAgent(districtId: number) {
    ;
    try {
      await this.commonMasterService.GetComponentsNewteshil(districtId, 3)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          this.AgentTehsilList = data['Data'];
          //console.log(this.AgentTehsilList, "AgentTehsilList");
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
    this.routers.navigate(
      ['/ProjectList'],
      {
        queryParams: {
          districtId: this.searchModel.districtId,
          tehsilId: this.searchModel.tehsilId,
          projectName: this.searchModel.projectName?.trim(),
          promoterName: this.searchModel.promoterName?.trim(),
          status: this.searchModel.status
        }
      }
    );
  }
  onAgentSearch() {
    
    this.routers.navigate(
      ['/AgentList'],
      {
        queryParams: {
          districtId: this.AgentsearchModel.districtId,
          tehsilId: this.AgentsearchModel.tehsilId,
          agentName: this.AgentsearchModel.agentName?.trim(),
          registrationNo: this.AgentsearchModel.registrationNo?.trim()
        }
      }
    );
  }

  async DashboardCount() {
    try {
      this.loaderService.requestStarted();

      const data: any = await this.homeService.GetHomePageData();

      const dashboard = data?.Data?.Dashboard;
      
      // dashboard counts
      this.AgentCount = dashboard?.AgentApproved || 0;
      this.ProjectCount = dashboard?.ProjectApproved  || 0;
      this.PromoterCount = dashboard?.PromoterApproved  || 0;
      this.ComplaintCount =
        (dashboard?.ComplaintOldApproved || 0) +
        (dashboard?.ComplaintNewApproved || 0);
 
      // latest judgements list
      this.judgementList = data?.Data?.LatestJudgements || [];
      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  //async TestDashboardCount() {
  //  try {
  //    
  //    this.loaderService.requestStarted();

  //    const data: any =
  //      await this.homeService.GetAgentWebsiteData(58079);

  //    console.log(data);



  //  } catch (error) {
  //    console.error(error);
  //  } finally {
  //    setTimeout(() => {
  //      this.loaderService.requestEnded();
  //    }, 200);
  //  }
  //}

  onComplaintdetailsSearch() {
    
    this.routers.navigate(
      ['/complaintdetails'],
      {
        queryParams: {
          compalaint_no: this._ComplaintdetailsSearchModel.compalaint_no?.trim(),
          complaint_status: this._ComplaintdetailsSearchModel.complaint_status?.trim(),
          complainant: this._ComplaintdetailsSearchModel.complainant?.trim(),
          respondent_name: this._ComplaintdetailsSearchModel.respondent_name?.trim()
        }
      }
    );
  }
  goToComplaintsDisposed() {
    this.routers.navigate(['/complaintdetails'], {
      queryParams: { complaint_status: 'Disposed' }
    });

  }
  goToPromoters() {
    this.routers.navigate(['/Promotersearch'], {
      queryParams: { status: 'disposed' }
    });

  }

  AdvanceonSearch() {
    debugger
    this.routers.navigate(
      ['/ProjectList'],
      {
        queryParams: {
          districtId: this.searchModel.districtId,
          tehsilId: this.searchModel.tehsilId,
          projectName: this.searchModel.projectName?.trim(),
          promoterName: this.searchModel.promoterName?.trim(),
          status: this.searchModel.status,
          registrationNo: this.searchModel.registrationNo?.trim(),
          projectType: this.searchModel.projectType
        
        }
      }
    );
  }


  resetData()
  {
    this.searchModel = new ProjectSearchModel();
    this.AgentsearchModel = new AgentSearchModel();
    this._ComplaintdetailsSearchModel = new ComplaintdetailsSearchModel();
    this.AgentTehsilList = [];
    this.TehsilList = [];
    this.searchModel.tehsilId = this.searchModel.tehsilId ?? 0;
    this.AgentsearchModel.tehsilId = this.AgentsearchModel.tehsilId ?? 0;
  }
  downloadApk() {
    const link = document.createElement('a');
    link.href = 'https://reraapp.rajasthan.gov.in/Content/App/ReraAPK.apk';
    link.download = 'ReraAPK.apk';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
