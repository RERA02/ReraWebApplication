import { Component, OnInit } from '@angular/core';
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
  templateUrl: './ViewAgent.component.html',
  styleUrls: ['./ViewAgent.component.css'],
    standalone: false
})

export class ViewAgentComponent implements OnInit {

  userId!: number;

  user: any = {};
  profile: any = {};
  partners: any[] = [];
  documents: any[] = [];
  pastExperience: any[] = [];
  branches: any[] = [];
  projects: any[] = [];
  gmPayments: any[] = [];
  criminalPoliceCases: any[] = [];
  otherStateRegistration: any[] = [];
  allFalseStateProvinces: any[] = [];
  TypeName: string = "";
  ProfileTypeName: string = "";
  ProfileType: number = 0;
  docUrl: string= "";
  constructor(
    private commonService: CommonFunctionService,
    private route: ActivatedRoute,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.userId = +p['id'];
      if (this.userId > 0) {
        
        this.docUrl = this.commonService.DocUrl;
      }
    });
  }

  loadAgentProfile() {
    this.loader.requestStarted();

    Promise.all([
      this.getUser(),
      this.getUserProfile(),
      this.getPartners(),
      this.getDocuments(),
      this.getPastExperience(),
      this.getBranches(),
      this.getProjects(),
      this.getGMPayments(),
      this.GetCriminalPoliceCasesByAgentId(),
      this.GetAllFalseStateProvinces(),
      this.GetOtherStateRegistrationByAgentId()      
    ]).finally(() => this.loader.requestEnded());
  }

  getUser() {
    return this.commonService.CommonDetails({
      Action: 'UserDetails',
      Id: this.userId
    }).then((res: any) => {
      this.user = res.Data?.[0];
    });
  }

  getUserProfile() {
    return this.commonService.CommonDetails({
      Action: 'UserProfile',
      Id: this.userId
    }).then((res: any) => {
      this.profile = res.Data?.[0];
      if (this.profile?.InformationType == 1) {
        this.ProfileType = 1;
        this.ProfileTypeName = "Individual";
        this.ProfileTypeName = "Agent";
      }
      else if (this.profile?.InformationType == 3) {
        this.ProfileType = 3;
        this.ProfileTypeName = "Proprietorship";
        this.ProfileTypeName = "Agent";
      }

      else if (this.profile?.InformationType == 2 || this.profile?.InformationType == 6)
        {
        this.ProfileType = 2;
        this.ProfileTypeName = "Firm / Company / Associates Etc";
        this.ProfileTypeName = "Partner";
        }

     

    });
  }

  getPartners() {
    return this.commonService.CommonDetails({
      Action: 'GetPartnersByUserId',
      Id: this.userId
    }).then((res: any) => {
      this.partners = res.Data || [];
    });
  }

  getDocuments() {
    return this.commonService.GetAllAgentDocumentUploadList({
      UserId: this.userId,
      ProfileType: this.profile?.InformationType || 1
    }).then((res: any) => {
      this.documents = res.Data || [];
    });
  }

  getPastExperience() {
    return this.commonService.CommonDetails({
      Action: 'GetPastExperienceDetailsByUserId',
      Id: this.userId
    }).then((res: any) => {
      this.pastExperience = res.Data || [];
    });
  }

  getBranches() {
    return this.commonService.CommonDetails({
      Action: 'GetBranchDetailsByUserId',
      Id: this.userId
    }).then((res: any) => {
      this.branches = res.Data || [];
    });
  }

  getProjects() {
    return this.commonService.CommonDetails({
      Action: 'GetProjectsDetailByUserId',
      Id: this.userId
    }).then((res: any) => {
      this.projects = res.Data || [];
    });
  }

  getGMPayments() {
    return this.commonService.CommonDetails({
      Action: 'GetGMPayStus',
      Id: this.userId,
      isProfileOrProject: 1
    }).then((res: any) => {
      this.gmPayments = res.Data || [];
    });
  }
  GetCriminalPoliceCasesByAgentId() {
    return this.commonService.CommonDetails({
      Action: 'GetCriminalPoliceCasesByAgentId',
      Id: this.userId,
      Type: this.ProfileTypeName
    }).then((res: any) => {
      
      this.criminalPoliceCases = res.Data || [];
    });
  }
  GetOtherStateRegistrationByAgentId() {
    return this.commonService.CommonDetails({
      Action: 'GetOtherStateRegistrationByAgentId',
      Id: this.userId,
      Type: this.ProfileTypeName
    }).then((res: any) => {
      
      this.otherStateRegistration = (res.Data || []).map((item: any) => {

        const state = this.allFalseStateProvinces.find(
          (s: any) => s.Id == item.StateId
        );

        return {
          ...item,
          StateName: state ? state.Name : ''
        };
      });

    });
  }
  GetAllFalseStateProvinces() {
    return this.commonService.CommonDetails({
      Action: 'GetAllFalseStateProvinces'     
    }).then((res: any) => {
      
      this.allFalseStateProvinces = res.Data || [];
    });
  }
}

