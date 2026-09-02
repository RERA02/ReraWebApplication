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
  selector: 'app-CancellationRefundPolicy',
  templateUrl: './CancellationRefundPolicy.component.html',
  styleUrls: ['./CancellationRefundPolicy.component.css'],
    standalone: false
})

export class CancellationRefundPolicyComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
 
  public sSOLoginDataModel = new SSOLoginDataModel();

  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
    //console.log('Home');
    //this.sSOLoginDataModel.DepartmentID = 1;
    //await this.GetAllPost();
    //sessionStorage.clear();
    //localStorage.clear();
    
  }

  // get all data
  async GetAllPost() {
    try {
     // this.sSOLoginDataModel.DepartmentID = 1;
      this.loaderService.requestStarted();
      await this.homeService.GetAllPost(this.PostId,this.sSOLoginDataModel.DepartmentID)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.CampusPostList = data['Data'];
          console.log(this.CampusPostList,"CampusPostList")
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

}
