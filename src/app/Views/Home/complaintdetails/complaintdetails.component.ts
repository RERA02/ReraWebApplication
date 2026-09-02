import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { AgentSearchModel, ComplaintdetailsSearchModel } from '../../../Models/Master';


@Component({
  selector: 'app-home',
  templateUrl: './complaintdetails.component.html',
  styleUrls: ['./complaintdetails.component.css'],
  standalone: false
})

export class complaintdetailsComponent implements OnInit {
  searchModel = new ComplaintdetailsSearchModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];
  ComplaintDataModel: any[] = [];
  compalinttypeEnc: string = '';
  //applicationStatus: number = 0;
  //ComplaintNumber: string = '';
  //ComplaintTypeId: number = 0;
  //respondent_name: string = '';

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    debugger
    /*    this.loaderService.requestStarted();*/
    this.docUrl = this.commonMasterService.DocUrl;
    this.route.queryParams.subscribe(params => {
      this.searchModel.complaint_status = params['complaint_status'] || '';
      this.searchModel.compalaint_no = params['compalaint_no'] || '';
      this.searchModel.complainant = params['complainant'] || '';
      this.searchModel.respondent_name = params['respondent_name'] || '';

      this.compalinttypeEnc = params['ComplaintTypeId'] || 0;

      if (this.compalinttypeEnc == 'zAdfddfui') {
        this.searchModel.ComplaintTypeId = 1

      }
      else if (this.compalinttypeEnc == 'HzAdfddfuiH') {
        this.searchModel.ComplaintTypeId = 2

      }

      else
      {
        this.searchModel.ComplaintTypeId = 0
      }


     
      //this.searchModel.compalaint_no = params['status'] ?? params['compalaint_no'] ?? '';
      //this.ComplaintTypeId = Number(this.searchModel.ComplaintTypeId);
      //if (this.searchModel.compalaint_no != "") {
      //  this.onSearch();

      //} else {
      //  this.GetComplainantList();

      //}


      this.GetComplainantList();
    });
   
    //if (this.searchModel.compalaint_no === 'disposed') {
    //  this.searchModel.compalaint_no = '';
    //}
  }














  onSearch() {


    //this.ComplaintNumber = this.searchModel.compalaint_no;

    this.GetComplainantList();
  }
  clearAll() {

    //window.location.reload();
    //this.applicationStatus = 0;
    //this.applicationStatus = 0;
    //this.ComplaintNumber = "";
    //this.respondent_name = "";

    this.searchModel = new ComplaintdetailsSearchModel();
    this.TehsilList = [];

    this.GetComplainantList();
  }

  async GetComplainantList() {


    this.ProjectList = [];
    this.totalRecords = 0;

    try {
      this.loaderService.requestStarted();
      debugger
      const data: any = await this.HomeService.GetComplainantListWebsite(this.searchModel);
      
      console.log('API Response:', data.Data);

      if (data.Data && Array.isArray(data.Data) && data.Data.length > 0 && data.Data) {
        this.ProjectList = data.Data;
        this.totalRecords = data.Data.length;

      } else {
        this.ProjectList = [];
        this.totalRecords = 0;
      }

      this.currentPage = 1;
      this.calculatePagination();

    }
    catch (error) {
      console.error('API Error:', error);
      this.ProjectList = [];
      this.totalRecords = 0;
    }

    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 1000);
    }
  }



  calculatePagination() {
    this.totalPages = Math.ceil(this.ProjectList.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProjectList = this.ProjectList.slice(startIndex, endIndex);
    this.cdr.markForCheck();
  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }
  get startRecord(): number {
    if (this.ProjectList.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.ProjectList.length
    );
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }




  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  paginationWindowSize = 10; // show 10 page numbers at a time

  get totalPages1(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get visiblePages(): number[] {
    const startPage =
      Math.floor((this.currentPage - 1) / this.paginationWindowSize) *
      this.paginationWindowSize +
      1;

    const endPage = Math.min(
      startPage + this.paginationWindowSize - 1,
      this.totalPages
    );

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
  getFileUrl(row: any): string | null {
    debugger
    return row?.UploadedFilePath
      ? `/Content/uploads/ComplaintDocuments/${row?.UploadedFilePath}`
      : null;
  }

  //getBHearingDateTime(row: any): string {
  //  debugger
  //  if (!row) return 'Nill';

  //  const today = new Date();
  //  const todayValue = this.formatToNumber(today);

  //  let hearingDateTime = '';

  //  if (row.strHearingDate != null && row.strHearingDate !== '') {

  //    const dateParts = row.strHearingDate.split('/'); // DD/MM/YYYY

  //    const hearingDate = new Date(
  //      Number(dateParts[2]),      // year
  //      Number(dateParts[1]) - 1,  // month
  //      Number(dateParts[0])       // day
  //    );

  //    const hearingValue = this.formatToNumber(hearingDate);

  //    if (todayValue > hearingValue) {
  //      hearingDateTime = '';
  //    } else {
  //      hearingDateTime = row.strHearingDate + ',' + row.HearingTime;
  //    }

  //  } else {
  //    // Same behavior as original JS
  //    hearingDateTime = row.strHearingDate + ',' + row.HearingTime;
  //  }

  //  if (hearingDateTime != "null,null") {
  //    return hearingDateTime;
  //  }

  //  return 'Nill';
  //}

  //formatToNumber(date: Date): number {
  //  const year = date.getFullYear();
  //  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //  const day = ('0' + date.getDate()).slice(-2);
  //  return Number(`${year}${month}${day}`);
  //}

  getBHearingDateTime(dataRow: any): string {

    if (!dataRow) return '';

    const today = new Date();

    // Same as moment().format('YYYY/MM/D') and removing '/'
    const currentDate =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString() +
      today.getDate().toString();

    let content = '';
    let bhHearingDateTime = '';

    if (dataRow.strHearingDate != null && dataRow.strHearingDate !== '') {

      const parts = dataRow.strHearingDate.split('/'); // DD/MM/YYYY

      if (parts.length === 3) {

        const nextHearingDate =
          parts[2] + parts[1] + parts[0]; // YYYYMMDD (no zero padding — same as MVC)

        if (dataRow.strBhearingDate != null && dataRow.strBhearingDate !== '') {

          if (currentDate > nextHearingDate) {
            bhHearingDateTime = dataRow.strHearingDate;
          } else {
            bhHearingDateTime = dataRow.strBhearingDate;
          }

        }
      }

    } else {
      bhHearingDateTime = dataRow.strBhearingDate;
    }

    content = bhHearingDateTime;

    return content;
  }

  //getBHearingDateTime(row: any): string {
  //  debugger
  //  if (!row) return 'Nill';

  //  const today = new Date();
  //  const todayValue = this.toComparableDate(today);

  //  let bhDateTime = '';

  //  if (row.strHearingDate) {
  //    const hearingDate = this.parseDDMMYYYY(row.strHearingDate);
  //    const hearingValue = this.toComparableDate(hearingDate);

  //    if (row.strBhearingDate) {
  //      if (todayValue > hearingValue) {
  //        bhDateTime = `${row.strHearingDate}, ${row.HearingTime}`;
  //      } else {
  //        bhDateTime = `${row.strBhearingDate}, ${row.BhearingTime}`;
  //      }
  //    }
  //  } else if (row.strBhearingDate) {
  //    bhDateTime = `${row.strBhearingDate}, ${row.BhearingTime}`;
  //  }

  //  return bhDateTime && bhDateTime !== 'null,null' ? bhDateTime : 'Nill';
  //}

  /* 🔹 Helpers */

  private parseDDMMYYYY(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(+year, +month - 1, +day);
  }

  private toComparableDate(date: Date): number {
    return Number(
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0')
    );
  }

  //getHearingDateTime(row: any): string {
  //  if (!row) return 'Nill';

  //  let hearingDateTime = '';

  //  if (row.strHearingDate) {
  //    const hearingDate = this.parseDDMMYYYY(row.strHearingDate);
  //    const todayValue = this.getComparableToday();
  //    const hearingValue = this.getComparableDate(hearingDate);

  //    if (todayValue > hearingValue) {
  //      hearingDateTime = '';
  //    } else {
  //      hearingDateTime = `${row.strHearingDate}, ${row.HearingTime}`;
  //    }
  //  } else {
  //    hearingDateTime = `${row.strHearingDate}, ${row.HearingTime}`;
  //  }

  //  return hearingDateTime && hearingDateTime !== 'null,null'
  //    ? hearingDateTime
  //    : 'Nill';
  //}


  /* 🔹 Helpers */

  //getHearingDateTime(dataRow: any): string {

  //  const today = new Date();

  //   Same as: moment().format('YYYY/MM/D') and removing '/'
  //  const currentDate =
  //    today.getFullYear().toString() +
  //    (today.getMonth() + 1).toString() +
  //    today.getDate().toString();

  //  let content = '';
  //  let hearingDateTime = '';

  //  if (dataRow.strHearingDate != null && dataRow.strHearingDate !== '') {

  //     Convert DD/MM/YYYY → YYYYMMDD (same as reverse + remove /)
  //    const parts = dataRow.strHearingDate.split('/'); // DD/MM/YYYY

  //    if (parts.length === 3) {

  //      const nextHearingDate =
  //        parts[2] + parts[1] + parts[0]; // YYYYMMDD (no zero padding, same as JS)

  //      if (currentDate > nextHearingDate) {
  //        hearingDateTime = '';
  //      } else {
  //        hearingDateTime =
  //          dataRow.strHearingDate + ',' + dataRow.HearingTime;
  //      }
  //    }

  //  } else {
  //    hearingDateTime =
  //      dataRow.strHearingDate + ',' + dataRow.HearingTime;
  //  }

  //  if (hearingDateTime != 'null,null') {
  //    content = hearingDateTime;
  //  } else {
  //    content = 'Nill';
  //  }

  //  return content;
  //}
  getHearingDateTime(dataRow: any): string {

    if (!dataRow) return 'Nill';

    const today = new Date();

    const currentDate =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString() +
      today.getDate().toString();

    let hearingDateTime = '';

    if (dataRow.strHearingDate != null && dataRow.strHearingDate !== '') {

      const parts = dataRow.strHearingDate.split('/');

      if (parts.length === 3) {

        const nextHearingDate =
          parts[2] + parts[1] + parts[0]; // YYYYMMDD

        if (dataRow.strBhearingDate != null && dataRow.strBhearingDate !== '') {

          if (currentDate > nextHearingDate) {
            hearingDateTime = dataRow.strHearingDate;
          } else {
            hearingDateTime = dataRow.strBhearingDate;
          }

        } else {

          if (currentDate > nextHearingDate) {
            hearingDateTime = '';
          } else {
            hearingDateTime = dataRow.strHearingDate;
          }
        }
      }

    } else {
      hearingDateTime = dataRow.strHearingDate;
    }

    if (hearingDateTime && hearingDateTime !== 'null,null') {
      return hearingDateTime;
    }

    return 'Nill';
  }


  private getComparableToday(): number {
    const d = new Date();
    return this.getComparableDate(d);
  }

  private getComparableDate(d: Date): number {
    return Number(
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      d.getDate().toString().padStart(2, '0')
    );
  }

  onPageSizeChange(event: any) {
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.calculatePagination();
  }
  firstPage() {
    this.currentPage = 1;
    this.updatePagedData();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.updatePagedData();
  }
}
