import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';


@Component({
  selector: 'app-MyProfile',
  templateUrl: './MyProfile.component.html',
  styleUrls: ['./MyProfile.component.css'],
    standalone: false
})

export class MyProfileComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
  docUrl: string = "";
  public sSOLoginDataModel = new SSOLoginDataModel();
  profileType: number = 0;
  tabId: number = 0;
  message: string = '';
  TypeMod: number = 0;
  paramCurrentUserId: number = 0;
  AppNo: string = '';
  model: any;
  modelIndividualProfileGetPartial: any;

  public ProjectPaymentlist: any[] = [];
  public Prefixlist: any[] = [];
  public DirectorDesignationList: any[] = [];
  public LLPDesignationList: any[] = [];
  public PartnershipDesignationList: any[] = [];
  public Enterpriseype: any[] = [];
  fileBasePath: string = '../';

  panCardFileName: string = 'No file chosen';
  baseUrl: string = '../';
  submitted = false;
  constructor(private cdr: ChangeDetectorRef,private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
    this.docUrl = this.commonMasterService.DocUrl;
    this.profileType = this.activatedRoute.snapshot.queryParams['profileType'];
    this.tabId = this.activatedRoute.snapshot.queryParams['tabId'];
    this.message = this.activatedRoute.snapshot.queryParams['message'];
    this.TypeMod = this.activatedRoute.snapshot.queryParams['TypeMod'];
    this.paramCurrentUserId = this.activatedRoute.snapshot.queryParams['paramCurrentUserId'];
    this.AppNo = this.activatedRoute.snapshot.queryParams['AppNo'];
    this.cdr.markForCheck();
    await this.GetMyProfile();
    
  }
  async GetMyProfile() {
    try {
      debugger
      this.loaderService.requestStarted();

      const data: any = await this.homeService.MyProfileApi(
        this.profileType,
        this.tabId,
        this.message,
        this.TypeMod,              
        this.paramCurrentUserId,
        this.AppNo
      );

      console.log(data);

      this.model = data?.Model ;
      if (this.model != null) {
        this.GetIndividualProfileGetPartial();
      }
      this.cdr.markForCheck();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  async GetIndividualProfileGetPartial() {
    try {
      debugger
      this.loaderService.requestStarted();
      const data: any = await this.homeService.IndividualProfileGetPartialApi(
        this.TypeMod,
        this.paramCurrentUserId,
       
      );

      console.log(data);

      this.modelIndividualProfileGetPartial = data.Model;
      this.ProjectPaymentlist = data.Dropdowns.ProjectPaymentlist;
      this.Prefixlist = data.Dropdowns.Prefixlist;
      this.DirectorDesignationList = data.Dropdowns.DirectorDesignationList;
     
      this.LLPDesignationList = data.Dropdowns.LLPDesignationList;
      this.PartnershipDesignationList = data.Dropdowns.PartnershipDesignationList;
      this.Enterpriseype = data.Dropdowns.Enterpriseype;

      this.getHeadingName();
      

      this.cdr.markForCheck();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  getHeadingName(): string {

    const type = this.modelIndividualProfileGetPartial?.InformationType;

    switch (type) {
      case 1: return 'Details of Individual';
      case 6: return 'Details of Company';
      case 3: return 'Proprietorship';
      case 4: return 'Details of LLP';
      case 5: return 'Details of HUF';
      case 2: return 'Details of Partnership Firm';
      default: return '';
    }
  }


  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];

    if (file) {
      // store file in model (if sending in FormData later)
      this.modelIndividualProfileGetPartial[fieldName] = file;
    }
  }

  onChangeUploadDocuments(event: any, fieldName: string, viewId: string) {
    const file = event.target.files[0];

    if (file) {
      this.panCardFileName = file.name;

      // Save file object (if uploading via API later)
      this.model[fieldName] = file;

      // If you are saving only path string after upload,
      // replace above line with API response path
    }
  }

}
