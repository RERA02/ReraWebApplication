import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { GetComplaintsAgainstRespondenSearch, SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF } from '../../../Models/Master';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ViewAgentNew',
  templateUrl: './ViewAgentNew.component.html',
  styleUrls: ['./ViewAgentNew.component.css'],
  standalone: false
})

export class ViewAgentNewComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public agentWebsiteData: any[] = [];
  public PlacementCompanyList: any[] = [];
  public GetComplaintsAgainstRespondentList: any[] = [];
  agentModel: any;
  agentId: string = "";
  docUrl: string = "";

  public sSOLoginDataModel = new SSOLoginDataModel();
  public request = new ComplaintAdjudicatingPDF();
  public model1 = new ComplaintAdjudicatingOfficerModel();
  public _Search = new GetComplaintsAgainstRespondenSearch();
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }




  ngOnInit() {
    this.sSOLoginDataModel.DepartmentID = 1;

    sessionStorage.clear();
    localStorage.clear();
    this.route.queryParams.subscribe(params => {
      this.agentId = params['id'];   // string → number
      
      this.docUrl = this.commonMasterService.DocUrl;
      if (this.agentId) {
        this.ViewAgentData(this.agentId);
      }
    });

  }





  async ViewAgentData(Id: string) {
    try {
      
      this.loaderService.requestStarted();

      const data: any =
        await this.homeService.GetAgentWebsiteData(Id);
      this.agentModel = data;
      this.cdr.markForCheck();
      //console.log(data);



    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  // get all data

}
