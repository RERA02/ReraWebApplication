import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';


@Component({
  selector: 'app-AnnualReport',
  templateUrl: './AnnualReport.component.html',
  styleUrls: ['./AnnualReport.component.css'],
    standalone: false
})

export class AnnualReportComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
  public model: any;
  public sSOLoginDataModel = new SSOLoginDataModel();
  docUrl: string = "";
  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
  
    sessionStorage.clear();
    localStorage.clear();
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetAnnualReportWebSite();
    
  }


  async GetAnnualReportWebSite() {
    debugger
    this.model = null;
    try {
      this.loaderService.requestStarted();
      const data: any = await this.homeService.AnnualReportWebSite();
      console.log('API Response:', data);
      if (data) {
        this.model = data.data;
      } else {
        this.model = null;
      }
    }
    catch (error) {
      console.error(error);
      this.model = null;
    }
    finally {
      this.loaderService.requestEnded();
    }
  }

  getFileUrl(path: string) {
    return this.docUrl + path.replace('~', '');

  }

  openFile(path: string) {
    const url = this.docUrl + path.replace('~', '');
    window.open(url, '_blank');
  }
  // get all data
 

}
