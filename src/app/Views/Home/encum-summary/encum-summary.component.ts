import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-encum-summary',
  standalone: false,
  templateUrl: './encum-summary.component.html',
  styleUrl: './encum-summary.component.css'
})
export class EncumSummaryComponent implements OnInit  {

  searchModel = new GetUploadedDocumentsSPModel();

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  EncumbranceID: string = "";
  model: any;

  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }



  async ngOnInit()
  {

    this.route.queryParams.subscribe(params => {
      this.EncumbranceID = params['EncumID'];
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetEncumSummaryByIDWebSite(this.EncumbranceID);
    this.cdr.markForCheck();
  }

  async GetEncumSummaryByIDWebSite(EncumID: string) {

    this.model = null;
    
    try {
      this.loaderService.requestStarted();
      const response: any = await this.HomeService.GetEncumSummary(EncumID);
      debugger;
   
      if (response?.success && response?.Data) {

        this.model = response.Data;
        console.log("API Response :", response.Data)
        // Show/Hide Logic
        this.model.showOldEncum = this.model.EID == 1;
        this.model.showProposedEncum = this.model.PPID == 1;

        console.log("List" , this.model._ExistingEncumbrance);
        // Convert Audit Dates
        if (this.model._audit) {
          this.model._audit.forEach((item: any) => {
            item.StatusDate = this.convertDotNetDate(item.StatusDate);
            item.CreatedOn = this.convertDotNetDate(item.CreatedOn);
          });
        }

        // Convert Payment Dates
        if (this.model._pay) {
          this.model._pay.forEach((item: any) => {
            item.CreatedOn = this.convertDotNetDate(item.CreatedOn);
          });
        }
        this.showltrOld();
      }
      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
      this.model = null;
    }
    finally {
      this.loaderService.requestEnded();
    }
  }


  showltrOld() {
    if (this.model.showOldEncum == true) {
      this.model.showOldEncum = true;
    } else {
      this.model.showOldEncum = false;
    }
  }

  convertDotNetDate(dateString: string | null | undefined): string {
    if (!dateString) return '';

    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateString);
    if (!match) return '';

    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  //async goToSummary(PROJECTID: number = 0, QuarterId: number = 0, PT: number = 0) {
  //  const url = this.router.serializeUrl(
  //    this.router.createUrlTree(
  //      ['Summary'],
  //      {
  //        queryParams: {
  //          PROJECTID: PROJECTID,
  //          QuarterId: QuarterId,
  //          PT: PT
  //        }
  //      }
  //    )
  //  );

  //  window.open(url, '_blank');
  //}

}
