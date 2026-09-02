import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF, Model } from '../../../Models/Master';


@Component({
  selector: 'app-Summary',
  templateUrl: './Summary.component.html',
  styleUrls: ['./Summary.component.css'],
    standalone: false
})

export class SummaryComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;


  public Model: any;
    public hasData = false;
  public PlacementCompanyList: any[] = [];
 
  public sSOLoginDataModel = new SSOLoginDataModel();
  public request = new ComplaintAdjudicatingPDF();
  userId: number = 0;
  Type: number = 0;
  typemode: number = 0;
  PNR: string = '';
  TypeMod: number = 0;
  ProfileType: number = 0;
  docUrl: string = "";
  constructor(private cdr: ChangeDetectorRef, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
    console.log('Home');
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'] || 0;
      this.Type = +params['type'] || 0;
      this.typemode = +params['typemode'] || 0;
      this.PNR = params['PNR'] || '';
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetComplaintSummaryPDF();
    sessionStorage.clear();
    localStorage.clear();
    this.cdr.markForCheck();
  }

  // get all data
    async GetComplaintSummaryPDF() {
        try {
            debugger;
            this.loaderService.requestStarted();

            const data: any = await this.homeService.GetUserSummaryWebsite(
                this.userId,
                this.Type,
                this.typemode,
                this.PNR
            );

            console.log(data);

          this.Model = data || null;
          this.TypeMod = this.Model?.TypeMod ?? 0;
          this.ProfileType = this.Model?.ProfileType ?? 0;
          this.hasData = !!this.Model && Object.keys(this.Model).length > 0;
          this.cdr.markForCheck();
          console.log(this.Model, 'Summary');
        } catch (ex) {
            console.error(ex);
        } finally {
            setTimeout(() => {
                this.loaderService.requestEnded();
            }, 200);
        }
    }



}
