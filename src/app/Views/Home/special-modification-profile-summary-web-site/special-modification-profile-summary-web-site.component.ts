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
  selector: 'app-special-modification-profile-summary-web-site',
  standalone: false,
  templateUrl: './special-modification-profile-summary-web-site.component.html',
  styleUrl: './special-modification-profile-summary-web-site.component.css'
})
export class SpecialModificationProfileSummaryWebSiteComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  causeType: number = 0;
  ID: string = "";
  UId: string = "";
  model: any;
  _PartnerList: any;
  _PartnerListChanges: any;
  allstates: any;


  DistrictOld: any;
  DistrictNew: any;
  TehsilOld: any;
  TehsilNew: any;

  districtOldList: any[] = [];
  districtNewList: any[] = [];
  tehsilOldList: any[] = [];
  tehsilNewList: any[] = [];
  stateNameNew: string = '';
  stateNameold: string = '';

  orgTypes: any = { '2': 'Limited Liability Partnership',  '3': 'Society',  '4': 'Partnership',   '5': 'Company',   '6': 'Competent Authority' };


  isReadOnly = true;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  async ngOnInit()
  {

    // fill District dropdowns
    this.fillddl(0, 2, 'DistrictOld');
    this.fillddl(0, 2, 'DistrictNew');

    this.FillStateProvinces();

    this.route.queryParams.subscribe(params => {
      this.ID = params['Id'];
      this.UId = params['Uid'];
    });
    this.docUrl = this.commonMasterService.DocUrl;
    await this.GetSpecialProfileModificationSummaryWebSite();
    this.cdr.markForCheck();
  }



  async GetSpecialProfileModificationSummaryWebSite() {
    debugger
    this.model = null;

    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.SpecialProfileModificationSummaryWebSite(this.ID, this.UId);
      console.log('API Response:', data);
      if (data)
      {
        debugger;
        this.model = data.data;
        if (this.model != undefined && this.model !="")
        {
          if (this.model?.DistrictOld && this.model.DistrictOld != 0)
          {
            this.fillddl(this.model.DistrictOld, 3, 'TehsilOld');
            this.model.TehsilOld = this.model.TehsilOld;
          }

          if (this.model?.DistrictNew && this.model.DistrictNew != 0) {

            this.fillddl(this.model.DistrictNew, 3, 'TehsilNew');
            this.model.TehsilNew = this.model.TehsilNew;
          }

          this.GetSpecialModificationPartnersDetails(this.ID);
          this.GetSpecialModificationPartnersChangesDetails(this.ID);
        }
      } else
      {
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


  async GetSpecialModificationPartnersDetails(AppID: string) {
    debugger
    this._PartnerList = null;

    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.SpecialProfileModificationPartnerDtls(AppID, "Add", "Summary");
      console.log('API Response partnerList:', data);
      if (data)
      {
        this._PartnerList = data.data;
        const dataChannges: any = await this.HomeService.SpecialProfileModificationPartnerDtls(AppID, "View", "Summary");
        this._PartnerListChanges = dataChannges.data;
        console.log(this._PartnerList);
      } else
      {
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

  async GetSpecialModificationPartnersChangesDetails(AppID: string) {
    debugger
    this._PartnerListChanges = null;

    try {
      this.loaderService.requestStarted();
      const data: any = await this.HomeService.SpecialProfileModificationPartnerDtls(AppID, "View", "Summary");
      console.log('API Response partnerList Changes:', data);
      if (data) {
       
        
        this._PartnerListChanges = data.data;
        console.log(this._PartnerListChanges);
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


  onDistrictNewChange(event: any) {
    const value = event.target.value;
    this.fillddl(value, 3, 'TehsilNew');
  }

 //async fillddl(parentid: any, typeid: number, element: string) {

 //   if (!parentid) {
 //     parentid = 0;
 //   }

 //  this.loaderService.requestStarted();
 //  const data: any = await this.HomeService.FillDDL(parentid, typeid);
 //  if (data) {


 //    let list: any[] = [];
 //    list.push({ Value: '', Text: '-- Select --' });

 //    data.forEach((value: any) => {
 //      list.push(value);
 //    });

 //    if (typeid == 3) {
 //      list.push({ Value: '-1', Text: 'Other' });
 //    }

 //    if (element === 'DistrictOld')
 //      this.districtOldList = list;

 //    if (element === 'DistrictNew')
 //      this.districtNewList = list;

 //    if (element === 'TehsilOld')
 //      this.tehsilOldList = list;

 //    if (element === 'TehsilNew')
 //      this.tehsilNewList = list;
 //  }



 // }


  async fillddl(parentid: any, typeid: number, element: string) {

    try {

      if (!parentid) {
        parentid = 0;
      }

      this.loaderService.requestStarted();

      const data: any = await this.HomeService.FillDDL(parentid, typeid);

      let list: any[] = [
        { Value: '', Text: '-- Select --' }
      ];

      //if (data && Array.isArray(data)) {
      //  data.forEach((value: any) => {
      //    list.push({
      //      Value: value.Value,
      //      Text: value.Text
      //    });
      //  });
      //}
      console.log("AAAAAA", data);

      //let list: any[] = [];

      if (data && data.success && Array.isArray(data.data)) {
        data.data.forEach((value: any) => {
          list.push({
            Value: value.Value,
            Text: value.Text
          });
        });
      }

      if (typeid === 3) {
        list.push({ Value: '-1', Text: 'Other' });
      }

      switch (element) {
        case 'DistrictOld':
          this.districtOldList = [...list];
          break;

        case 'DistrictNew':
          this.districtNewList = [...list];
          break;

        case 'TehsilOld':
          this.tehsilOldList = [...list];
          break;

        case 'TehsilNew':
          this.tehsilNewList = [...list];
          break;
      }

    } catch (error) {
      console.error('FillDDL Error:', error);
    } finally {
      this.loaderService.requestEnded();  
    }
  }



  async FillStateProvinces() {
    debugger
    this.loaderService.requestStarted();

    const data: any = await this.HomeService.FillStateDDL();
    debugger;

    if (data && data.data) {

      let list: any[] = [];

      // default option
      list.push({ Value: '', Text: '-- Select --' });
      debugger;
      // loop StateProvinces
      data.data.forEach((state: any) => {
        list.push({
          Value: state.Value,
          Text: state.Text
        });
      });
      debugger;
      this.allstates = list;

      
      console.log(this.allstates);
    }

    this.loaderService.requestEnded();
  }

  

}
