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
  selector: 'app-revocation-summary',
  standalone: false,
  templateUrl: './revocation-summary.component.html',
  styleUrl: './revocation-summary.component.css'
})
export class RevocationSummaryComponent implements OnInit  {

  searchModel = new GetUploadedDocumentsSPModel();

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  RevocationID: string = "";
  model: any;

  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }



  async ngOnInit()
  {

    this.route.queryParams.subscribe(params => {
      this.RevocationID = params['RevocationID'];
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetRevocationSummaryByIDWebSite(this.RevocationID);
    this.cdr.markForCheck();
  }

  async GetRevocationSummaryByIDWebSite(RevocationID: string) {

    this.model = null;

    this.loaderService.requestStarted();

    try {
      const response: any =
        await this.HomeService.GetRevocationSummary(RevocationID);

      if (response?.success === true && response?.Data) {

        this.model = response.Data;

        console.log("API Response:", this.model);

        // Show/Hide Logic
        this.model.showOldEncum = this.model.EID == 1;
        this.model.showProposedEncum = this.model.PPID == 1;

        // Audit Dates
        if (Array.isArray(this.model._audit)) {
          this.model._audit.forEach((item: any) => {
            item.StatusDate = this.convertDotNetDate(item.StatusDate);
            item.CreatedOn = this.convertDotNetDate(item.CreatedOn);
          });
        }

        // Payment Dates
        if (Array.isArray(this.model._pay)) {
          this.model._pay.forEach((item: any) => {
            item.CreatedOn = this.convertDotNetDate(item.CreatedOn);
          });
        }

        this.showltrOld();

      } else {
        this.model = null;
        console.error(response?.Message || "Revocation data not found.");
      }

      this.cdr.markForCheck();

    } catch (error) {
      console.error("Error fetching revocation summary:", error);
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


  getFileName(filePath: string): string {
    if (!filePath) return '';

    return filePath.replace(/\\/g, '/').split('/').pop() || '';
  }

  getFileUrl(filePath: string): string {
    if (!filePath) return '';

    // Remove ../ from the beginning of stored file path
    const cleanPath = filePath.replace(/^(\.\.\/)+/, '');

    return this.docUrl.replace(/\/+$/, '') + '/' + cleanPath;
  }

  getFileList(files: string): string[] {

    if (!files) return [];

    return files.split(',')
      .map((x: string) => x.trim())
      .filter((x: string) => x.length > 2);
  }
}
