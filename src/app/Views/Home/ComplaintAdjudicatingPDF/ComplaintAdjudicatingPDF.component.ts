import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF } from '../../../Models/Master';


@Component({
  selector: 'app-ComplaintAdjudicatingPDF',
  templateUrl: './ComplaintAdjudicatingPDF.component.html',
  styleUrls: ['./ComplaintAdjudicatingPDF.component.css'],
    standalone: false
})

export class ComplaintAdjudicatingPDFComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
 
  public sSOLoginDataModel = new SSOLoginDataModel();
  public request = new ComplaintAdjudicatingPDF();
  public model = new ComplaintAdjudicatingOfficerModel();
  
  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
    console.log('Home');
    this.sSOLoginDataModel.DepartmentID = 1;
    await this.GetComplaintAdjudicatingPDF();
    sessionStorage.clear();
    localStorage.clear();
    
  }

  // get all data
  async GetComplaintAdjudicatingPDF() {
    try {
      this.loaderService.requestStarted();
      this.request.id = 7343;
      //await this.homeService.ComplaintAdjudicatingPDF(this.request)
      //  .then((data: any) => {
      //    data = JSON.parse(JSON.stringify(data));
      //    console.log(data);
      //    this.model = data['Data'];
      //    console.log(this.model,"requestGet")
      //  }, (error: any) => console.error(error)
      //  );
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


  getComplainantName(name: string | null): string {
    if (!name) return '';
    const pos = name.indexOf('&');
    return pos >= 0 ? name.substring(0, pos) : name;
  }
}
