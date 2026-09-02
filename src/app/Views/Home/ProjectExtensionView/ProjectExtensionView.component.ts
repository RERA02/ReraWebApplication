import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { GetUploadedDocumentsSPModel } from '../../../Models/Master';


@Component({
  selector: 'app-home',
  templateUrl: './ProjectExtensionView.component.html',
  styleUrls: ['./ProjectExtensionView.component.css'],
  standalone: false
})

export class ProjectExtensionViewComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";

  causeType: number = 0;
  ProExtId: string = "";
  isUnderProcess: string = "";
  model: any;
  estimatedConstructionPercent: number = 0;
  totalLandPercent: number = 0;
  totalDevelopmentPercent: number = 0;

  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.route.queryParams.subscribe(async params => {

      this.ProExtId = params['ProExtId'];
      this.isUnderProcess = params['isUnderProcess'];

      await this.GetProjectExtensionView();

    });

    this.docUrl = this.commonMasterService.DocUrl;
  }



  formatDate(dateStr: any): Date | null {

    if (!dateStr) return null;

    dateStr = dateStr.toString().trim();

    const defaultDate = new Date(1900, 0, 1);


    if (/^-?\d+$/.test(dateStr)) {
      const num = Number(dateStr);
      return num <= 0 ? defaultDate : new Date(num);
    }


    const mvcMatch = /Date\((\-?\d+)\)/.exec(dateStr);
    if (mvcMatch) {
      const num = Number(mvcMatch[1]);
      return num <= 0 ? defaultDate : new Date(num);
    }


    const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
    if (slashMatch) {
      return new Date(
        Number(slashMatch[3]),
        Number(slashMatch[2]) - 1,
        Number(slashMatch[1])
      );
    }


    const dashMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateStr);
    if (dashMatch) {
      return new Date(
        Number(dashMatch[3]),
        Number(dashMatch[2]) - 1,
        Number(dashMatch[1])
      );
    }


    const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
    if (ymdMatch) {
      return new Date(
        Number(ymdMatch[1]),
        Number(ymdMatch[2]) - 1,
        Number(ymdMatch[3])
      );
    }


    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? defaultDate : parsed;
  }



  async GetProjectExtensionView() {
    debugger;
    this.model = null;
    try {
      this.loaderService.requestStarted();

      this.searchModel.id = 1;
      const data: any = await this.HomeService.GetProjectExtensionView(this.ProExtId, this.isUnderProcess);

      console.log('API Response:', data);

      if (data) {
        this.model = data.data;
        if (this.model?.id > 0) {
          this.calculatePercentages();
        }
        this.checkExtensionCondition();
        this.isOldNormalExtension();
        this.isBeforeB1YRelease();

      } else {
        this.model = null;
      }
      this.cdr.markForCheck();
    }
    catch (error) {
      console.error(error);
      this.model = null;
    }
    finally {
      this.loaderService.requestEnded();
    }
  }

  //checkExtensionCondition(): boolean {

  //  const cutoffDate = new Date(2021, 9, 5); // Month is 0-based (October = 9)

  //  return this.model?.AlreadyAvailedExt != null ||
  //    (this.model?.SendToAdminOn &&
  //      new Date(this.model.SendToAdminOn) > cutoffDate);
  //}
  checkExtensionCondition(): boolean {
    const cutoffDate = new Date(2021, 9, 5);

    if (!this.model?.SendToAdminOn) return false;

    // Extract milliseconds from /Date(...)/
    const match = this.model.SendToAdminOn.match(/\d+/);
    const inputDate = match ? new Date(parseInt(match[0], 10)) : null;

    //console.log("Parsed Date:", inputDate);

    return inputDate ? inputDate > cutoffDate : false;
  }

  isOldNormalExtension(): boolean {
    if (!this.model) return false;

    const cutoff = new Date('2021-10-05');
    const sendDate = new Date(this.model.SendToAdminOn);

    return this.model.ReasonOfExtensionNormalOrPandemic === 1 &&
      sendDate <= cutoff;
  }
  isBeforeB1YRelease(): boolean {
    if (!this.model?.SendToAdminOn) return false;

    const submissionDate = new Date(this.model.SendToAdminOn);
    const cutoffDate = new Date(2021, 9, 5); // Month is 0-based (9 = October)

    return submissionDate <= cutoffDate;
  }

  calculatePercentages() {

    // R2 Construction %
    if (this.model?.EstimatedConstructionCostR2 && this.model?.CostIncurredOnConstructionR2) {
      this.estimatedConstructionPercent =
        Number(
          (this.model.CostIncurredOnConstructionR2 * 100 /
            this.model.EstimatedConstructionCostR2).toFixed(2)
        );
    }

    // R3 Land %
    if (this.model?.TotalEstimatedLandCostR3 && this.model?.TotalCostIncurredOnLandR3) {
      this.totalLandPercent =
        Number(
          (this.model.TotalCostIncurredOnLandR3 * 100 /
            this.model.TotalEstimatedLandCostR3).toFixed(2)
        );
    }

    // R3 Development %
    if (this.model?.TotalEstimatedDevelopmentCostR3 && this.model?.TotalCostIncurredOnDevelopmentR3) {
      this.totalDevelopmentPercent =
        Number(
          (this.model.TotalCostIncurredOnDevelopmentR3 * 100 /
            this.model.TotalEstimatedDevelopmentCostR3).toFixed(2)
        );
    }
  }
}
