import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { GetComplaintsAgainstRespondenSearch, SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { ComplaintAdjudicatingOfficerModel, ComplaintAdjudicatingPDF } from '../../../Models/Master';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ViewProject',
  templateUrl: './ViewProject.component.html',
  styleUrls: ['./ViewProject.component.css'],
    standalone: false
})

export class ViewProjectComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  TypeMod: number = 1; 
  sanctionTotalPlots = 0;
  sanctionPlotsBooked = 0;
  documentMasterTypes: string[] = [];
  notSanctionTotalPlots = 0;
  notSanctionPlotsBooked = 0;
  public CampusPostList: any[] = [];
  public agentWebsiteData: any[] = [];
  public PlacementCompanyList: any[] = [];
  public GetComplaintsAgainstRespondentList: any[] = [];
  totalSanctionedApartment = 0;
  isPopupOpen = false;

  totalProposedNotSanctionedApartment = 0;
  projectModel: any;
  projectId: string = '';
  type: string = '';
  docUrl: string = "";
  @Input() endPoints: any[] = [];
  public sSOLoginDataModel = new SSOLoginDataModel();
  public request = new ComplaintAdjudicatingPDF();
  public model1 = new ComplaintAdjudicatingOfficerModel();
  public _Search = new GetComplaintsAgainstRespondenSearch();
  cutoffDate = new Date('2024-03-27');
  isApprovedBeforeCutoff = false;
/*  showOldAreaColumns: boolean = false;*/
  totalArea: number = 0;
/*  sendToAdminOn: string = '';*/
  _totalSanctionedApartment: number = 0;
  _totalProposedbutnotsanctionedapartment: number = 0;

  sanctionedApartments: any[] = [];
  notSanctionedApartments: any[] = [];
   sendToAdminOn!: Date;
  sendDate = new Date('2023-10-13');
  showOldColumns: boolean = false;
  projectDocuments: any;
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute,private http: HttpClient,private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  

  
  ngOnInit() {
    this.sSOLoginDataModel.DepartmentID = 1;

    sessionStorage.clear();
    localStorage.clear();
    this.route.queryParams.subscribe(params => {
      this.projectId = params['id'];   
      this.type = params['type']; 
      this.docUrl = this.commonMasterService.DocUrl;
      if (this.projectId) {
        this.ViewAgentData(this.projectId, this.type);
      


      }
    });

  }
  
  convertMvcDate(dateStr: any): Date | null {
   
    if (!dateStr) return null;

    dateStr = dateStr.toString().trim();

    const defaultDate = new Date(1900, 0, 1); // 01 Jan 1900

    // ✅ Handle numeric timestamp (positive & negative)
    if (/^-?\d+$/.test(dateStr)) {
      const num = Number(dateStr);
      return num <= 0 ? defaultDate : new Date(num);
    }

    // ✅ Handle MVC format /Date(...)/
    const mvcMatch = /Date\((\-?\d+)\)/.exec(dateStr);
    if (mvcMatch) {
      const num = Number(mvcMatch[1]);
      return num <= 0 ? defaultDate : new Date(num);
    }

    // ✅ Handle dd/MM/yyyy
    const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
    if (slashMatch) {
      return new Date(
        Number(slashMatch[3]),
        Number(slashMatch[2]) - 1,
        Number(slashMatch[1])
      );
    }

    // ✅ Handle dd-MM-yyyy
    const dashMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateStr);
    if (dashMatch) {
      return new Date(
        Number(dashMatch[3]),
        Number(dashMatch[2]) - 1,
        Number(dashMatch[1])
      );
    }

    // ✅ Handle yyyy-MM-dd
    const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
    if (ymdMatch) {
      return new Date(
        Number(ymdMatch[1]),
        Number(ymdMatch[2]) - 1,
        Number(ymdMatch[3])
      );
    }

    // ✅ Final fallback
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? defaultDate : parsed;
  }
  //convertMvcDate(dateStr: string): Date | null {
 

  //  if (!dateStr) return null;

  //  const matches = /Date\((\d+)\)/.exec(dateStr);

  //  return matches ? new Date(+matches[1]) : null;
  //}
 

  convertMvcDate1(dateStr: string): Date | null {


    if (!dateStr) return null;

    const matches = /Date\((\d+)\)/.exec(dateStr);

    const result = matches ? new Date(+matches[1]) : null;


    return result;
  }

  convertMvcDate22(dateStr: any): Date | null {
    debugger
    if (!dateStr) return null;

    dateStr = dateStr.toString().trim();

    const defaultDate = new Date(1900, 0, 1); // 01 Jan 1900

    // ✅ Handle numeric timestamp (positive & negative)
    if (/^-?\d+$/.test(dateStr)) {
      const num = Number(dateStr);
      return num <= 0 ? defaultDate : new Date(num);
    }

    // ✅ Handle MVC format /Date(...)/
    const mvcMatch = /Date\((\-?\d+)\)/.exec(dateStr);
    if (mvcMatch) {
      const num = Number(mvcMatch[1]);
      return num <= 0 ? defaultDate : new Date(num);
    }

    // ✅ Handle dd/MM/yyyy
    const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
    if (slashMatch) {
      return new Date(
        Number(slashMatch[3]),
        Number(slashMatch[2]) - 1,
        Number(slashMatch[1])
      );
    }

    // ✅ Handle dd-MM-yyyy
    const dashMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateStr);
    if (dashMatch) {
      return new Date(
        Number(dashMatch[3]),
        Number(dashMatch[2]) - 1,
        Number(dashMatch[1])
      );
    }

    // ✅ Handle yyyy-MM-dd
    const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
    if (ymdMatch) {
      return new Date(
        Number(ymdMatch[1]),
        Number(ymdMatch[2]) - 1,
        Number(ymdMatch[3])
      );
    }

    // ✅ Final fallback
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? defaultDate : parsed;
  }


  async ViewAgentData(Id:string ,Type:string ) {
    
    try {
      
      debugger
      this.loaderService.requestStarted();

      const data: any =
        await this.homeService.ViewProjectWebsite(Id, Type);
   
      this.projectModel = data;
      console.log(data);

  
      this.calculateApartmentTotals();
      this.calculateApartmentTotalsFalse();
      this.calculatePlotTotals();
      this.prepareDocumentTypes();
      this.prepareAllotteeData();


  
      if (this.projectModel?.GetProjectBasic?.ApprovedOn) {

        const approvedDate = this.convertMvcDate(
          this.projectModel?.GetProjectBasic?.ApprovedOn
        );

        this.isApprovedBeforeCutoff =
          !!approvedDate && approvedDate <= this.cutoffDate;
      }
      else {
        this.isApprovedBeforeCutoff = false;
      }


     
      //const building = this.projectModel?.GetBuildingDetails?.[0];


      //const allApartments = building?.GetAppartmentDetails || [];

      //if (allApartments.length > 0) {
      //  this.totalArea = allApartments.reduce(
      //    (sum: number, x: any) =>
      //      sum +
      //      (x.AreaOfVerandah || 0) +
      //      (x.AreaOfTerrace || 0) +
      //      (x.AreaOfStore || 0) +
      //      (x.OtherArea || 0),
      //    0
      //  );

      //  this.sanctionedApartments = allApartments.filter(
      //    (x: any) => x.sanctioned_NotSanctioned
      //  );
      //  this.notSanctionedApartments = allApartments.filter(
      //    (x: any) => !x.sanctioned_NotSanctioned
      //  );
      //}
      //

      //this.showOldColumns =
      //  this.sendToAdminOn < this.cutoffDate && this.totalArea === 0;


      this.projectModel?.GetBuildingDetails?.forEach((building: any) => {

        const allApartments = building?.GetAppartmentDetails || [];

        building.totalArea = allApartments.reduce(
          (sum: number, x: any) =>
            sum +
            (x.AreaOfVerandah || 0) +
            (x.AreaOfTerrace || 0) +
            (x.AreaOfStore || 0) +
            (x.OtherArea || 0),
          0
        );
        
        building.sanctionedApartments = allApartments.filter(
          (x: any) => x.sanctioned_NotSanctioned == true
        );

        building.notSanctionedApartments = allApartments.filter(
          (x: any) => x.sanctioned_NotSanctioned == false
        );

      });
      this.showOldColumns =
        this.sendToAdminOn < this.cutoffDate &&
        this.totalArea === 0;






    

      //if (building) {
      //  this.prepareBlockDetails(building);
      //}

      this.projectModel?.GetBuildingDetails?.forEach((building: any) => {
        this.prepareBlockDetails(building);
      });

      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 1000);
    }
  }

  calculateTotals() {
    
    this.totalSanctionedApartment = 0;
    this.totalProposedNotSanctionedApartment = 0;

    this.projectModel?.GetBuildingDetails?.forEach((b:any) => {
      b.GetAppartmentDetails?.forEach((a:any) => {
        if (a.sanctioned_NotSanctioned)
          this.totalSanctionedApartment += a.NumberOfApartments || 0;
        else
          this.totalProposedNotSanctionedApartment += a.NumberOfApartments || 0;
      });
    });
  }

  calculateApartmentTotals() {
   

    this.totalSanctionedApartment = 0;

    this.projectModel?.GetBuildingDetails?.forEach((building: any) => {

      building?.GetAppartmentDetails?.forEach((appart: any) => {

        if (appart?.sanctioned_NotSanctioned === true) {
          this.totalSanctionedApartment += appart.NumberOfApartments || 0;
        }

      });

    });
  }
  calculateApartmentTotalsFalse() {
   

    this.totalProposedNotSanctionedApartment = 0;

    this.projectModel?.GetBuildingDetails?.forEach((building: any) => {

      building?.GetAppartmentDetails?.forEach((appart: any) => {

        if (appart?.sanctioned_NotSanctioned === false) {
          this.totalProposedNotSanctionedApartment += appart.NumberOfApartments || 0;
        }

      });

    });
  }

  calculatePlotTotals() {
    
    this.sanctionTotalPlots = 0;
    this.sanctionPlotsBooked = 0;
    this.notSanctionTotalPlots = 0;
    this.notSanctionPlotsBooked = 0;

    this.projectModel?.PlotDetails?.forEach((x:any) => {

      if (x.sanctioned_NotSanctioned) {
        this.sanctionTotalPlots += x.TotalPlots || 0;
        this.sanctionPlotsBooked += x.Plots_booked_allotted_sold || 0;
      }
      else {
        this.notSanctionTotalPlots += x.TotalPlots || 0;
        this.notSanctionPlotsBooked += x.Plots_booked_allotted_sold || 0;
      }

    });
  }

  prepareDocumentTypes() {
    
    this.documentMasterTypes = Array.from(
      new Set(
        this.projectModel.GetDocumentsList
          .filter((x: any) =>
            x.MasterType != 'projectDocumentEmpanelledArchitect' &&
            x.MasterType != 'ProjectDocumentPRADOThanPlotted' &&
            x.MasterType != 'ProjectDocumentPRADPlotted'
          )
          .map((x: any) => x.MasterType as string)
      )
    );

  }




  getDocumentsByType(type: string) {
    return this.projectModel.GetDocumentsList
      .filter((x:any) => x.MasterType === type);
  }

  //getProposedText(item: any) {
  //  let proposed =
  //    item.Proposed == 0 ? 'No' :
  //      item.Proposed == 2 ? 'Not Available' :
  //        (item.Proposed == 1 || item.Proposed == 12) ? 'Yes' :
  //          'Not Applicable';

  //  return item.IsRequired ? 'Yes' : proposed;
  //}

  getProposedText(item: any) {

    let proposed =
      item.Proposed == 1 ? 'Yes' :
        item.Proposed == -1 ? 'No' :
        item.Proposed == 0 ? 'No' :
          item.Proposed == 2 ? 'Not Available' :
            item.Proposed == 3 ? 'Not Applicable' :
              '';

    return item.IsRequired ? 'Yes' : proposed;
  }

  getDocumentHeader(type: string) {

    switch (type.toUpperCase()) {
      case 'PROJECTDOCUMENTLEGAL':
        return 'PROJECT RELATED LEGAL DOCUMENT';
      case 'PROJECTDOCUMENTAPPROVAL':
        return 'PROJECT RELATED - APPROVAL DOCUMENT';
      case 'PROJECTDOCUMENTCOMMAN':
        return 'PROJECT RELATED COMMON DOCUMENT';
      case 'PROJECTDOCUMENT BUILDINGDOCUMENT':
        return 'PROJECT RELATED DOCUMENT BUILDING DOCUMENT';

      case 'PROJECTDOCUMENTNOC':
        return 'NOC Declarations';
      case 'PROJECTDOCUMENTOTHERAPPROVALS':
        return 'Other Approvals as may be required and obtained for the project (if any)';
      case 'PROJECTDOCUMENTAUTLETTER':
        return 'Authorization Letter/Board Resolution Letter';
      case 'PROJECTDOCUMENTAUDBALSHEET':
        return 'Audited Balance Sheet or ITR (As Applicable)';
      default:
        return type;
    }
  }

  plotGroups: any[] = [];
  apartmentGroups: any[] = [];

  //prepareAllotteeData() {

  //  if (!this.projectModel?.GetApartmentAllotteeDetailsList) return;

  //  const list = this.projectModel.GetApartmentAllotteeDetailsList;

  //  // ===== PLOTTED =====
  //  const plotMap = new Map();

  //  list.forEach((x: any) => {
  //    if (!plotMap.has(x.PlotId)) {
  //      plotMap.set(x.PlotId, {
  //        PlotId: x.PlotId,
  //        PlotType: x.PlotType,
  //        TotalPlots: x.TotalPlots,
  //        Plots_booked_allotted_sold: x.Plots_booked_allotted_sold,
  //        items: []
  //      });
  //    }
  //    plotMap.get(x.PlotId).items.push(x);
  //  });

  //  this.plotGroups = Array.from(plotMap.values());


  //  // ===== APARTMENT =====
  //  const apartmentMap = new Map();

  //  list.forEach((x: any) => {
  //    if (!apartmentMap.has(x.ApartmentId)) {
  //      apartmentMap.set(x.ApartmentId, {
  //        ApartmentId: x.ApartmentId,
  //        BuildingName: x.BuildingName,
  //        ApartmentName: x.ApartmentName,
  //        Block: x.Block,
  //        CarpetArea: x.CarpetArea,
  //        NumberOfApartments: x.NumberOfApartments,
  //        BookedApartment: x.BookedApartment,
  //        items: []
  //      });
  //    }
  //    apartmentMap.get(x.ApartmentId).items.push(x);
  //  });

  //  this.apartmentGroups = Array.from(apartmentMap.values());
  //}
  prepareAllotteeData() {

    if (!this.projectModel?.GetApartmentAllotteeDetailsList) return;

    const list = this.projectModel.GetApartmentAllotteeDetailsList;

    // ===== PLOTTED =====
    const plotMap = new Map();

    list.forEach((x: any) => {

      
      if (!x.PlotId) return;

      if (!plotMap.has(x.PlotId)) {
        plotMap.set(x.PlotId, {
          PlotId: x.PlotId,
          PlotType: x.PlotType,
          TotalPlots: x.TotalPlots,
          Plots_booked_allotted_sold: x.Plots_booked_allotted_sold,
          items: []
        });
      }

      plotMap.get(x.PlotId).items.push(x);
    });

    this.plotGroups = Array.from(plotMap.values())
      .sort((a: any, b: any) => a.PlotId - b.PlotId); 



    // ===== APARTMENT =====
    const apartmentMap = new Map();

    list.forEach((x: any) => {

     
      if (!x.ApartmentId) return;

      if (!apartmentMap.has(x.ApartmentId)) {
        apartmentMap.set(x.ApartmentId, {
          ApartmentId: x.ApartmentId,
          BuildingName: x.BuildingName,
          ApartmentName: x.ApartmentName,
          Block: x.Block,
          CarpetArea: x.CarpetArea,
          NumberOfApartments: x.NumberOfApartments,
          BookedApartment: x.BookedApartment,
          items: []
        });
      }

      apartmentMap.get(x.ApartmentId).items.push(x);
    });

    this.apartmentGroups = Array.from(apartmentMap.values())
      .sort((a: any, b: any) => a.ApartmentId - b.ApartmentId); // ✅ FIX 2
  }
  get totalEstimatedAmount(): number {
    return this.projectModel?.GetProjectCostDetail
      ?.filter((x: any) =>
        x.Name?.toLowerCase().includes('estimated land cost') ||
        x.Name?.toLowerCase().includes('estimated development cost')
      )
      .reduce((sum: number, x: any) => sum + (x.EstimatedAmount || 0), 0) || 0;
  }

  get checkedCommonAreaItems() {
    return this.projectModel?.CommonAreaItemsCharged?.filter((x:any) => x.Checked) || [];
  }


  getSanctionTotalPlots() {
    return this.projectModel?.PlotDetails
      ?.filter((x:any) => x.sanctioned_NotSanctioned === true)
      ?.reduce((sum:number, x:any) => sum + (x.TotalPlots || 0), 0);
  }

  getSanctionBookedPlots() {
    return this.projectModel?.PlotDetails
      ?.filter((x: any) => x.sanctioned_NotSanctioned === true)
      ?.reduce((sum: number, x: any) => sum + (x.Plots_booked_allotted_sold || 0), 0);
  }

  getNotSanctionTotalPlots() {
    return this.projectModel?.PlotDetails
      ?.filter((x: any) => x.sanctioned_NotSanctioned === false)
      ?.reduce((sum: number, x: any) => sum + (x.TotalPlots || 0), 0);
  }

  getNotSanctionBookedPlots() {
    return this.projectModel?.PlotDetails
      ?.filter((x: any) => x.sanctioned_NotSanctioned === false)
      ?.reduce((sum: number, x: any) => sum + (x.Plots_booked_allotted_sold || 0), 0);
  }


  showOldAreaColumns(): boolean {
    return this.sendToAdminOn && this.sendToAdminOn < new Date('2023-10-13') && this.totalArea === 0;
  }

  blockText(appart: any) {
    return appart.BulidingBlockNumber && appart.BulidingBlockNumber !== 0
      ? 'Block - ' + appart.BulidingBlockNumber
      : appart.BulidingBlockText || '-';
  }

  displayValue(val: any) {
    return val != null ? val : 0;
  }


  private prepareBlockDetails(item: any) {
    
    if (!item?.NumberOfBlocksString || !item?.NumberOfBlocks) {
      item.BlockDetails = [];
      return;
    }

    const data = item.NumberOfBlocksString
      .split(',')
      .filter((x: string) => x !== '');

    let num = 0;
    const result: any[] = [];

    // IMPORTANT
    const isOldFormat = data.length === item.NumberOfBlocks * 2;

    for (let i = 0; i < item.NumberOfBlocks; i++) {

      let basementValue = 0;
      let floorValue = 0;
      let stiltValue = 0;

      if (isOldFormat) {
        // basement , floor
        basementValue = Number(data[num] || 0);
        floorValue = Number(data[num + 1] || 0);
        num += 2;
      }
      else {
        // basement , floor , stilt
        basementValue = Number(data[num] || 0);
        floorValue = Number(data[num + 1] || 0);
        stiltValue = Number(data[num + 2] || 0);
        num += 3;
      }

      result.push({
        blockNumber: i + 1,
        basement: basementValue,
        stilt: stiltValue,
        floor: floorValue
      });
    }

    item.BlockDetails = result;
  }


  //formatDate(date: any): string {
  //  if (!date) return '';

  //  const d = new Date(date);

  //  const day = ('0' + d.getDate()).slice(-2);
  //  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  //  const year = d.getFullYear();

  //  return `${day}-${month}-${year}`;
  //}

  getLayoutApprovalDocs(): any[] {
    
    if (!this.projectModel?.ProjectDocuments?.GetDocumentsList) return [];

    return this.projectModel?.ProjectDocuments.GetDocumentsList.filter((x: any) =>
      x.MasterType === 'ProjectDocumentPRADPlotted' &&
      x.ApplicationDocumentId === 67
    );
  }

  cleanUrl(url: string): string {
    return url ? url.replace('..', '').replace('~','') : '';
  }

  getEmpanelledArchitectDocs() {
    return this.projectDocuments?.GetDocumentsList
      ?.filter((x: any) => x.MasterType === 'projectDocumentEmpanelledArchitect') || [];
  }


  getSum(field: string): number {
    const data = this.projectModel?.ProjectCommanArea?.ProjectCommonAreaDetails || [];

    return data.reduce((sum: number, item: any) => {
      return sum + (item[field] || 0);
    }, 0);
  }
  // Split logic
  getParts(text: string): string[] {
    if (!text) return [''];
    return text.includes('+') ? text.split('+') : [text];
  }

  // Highlight 
  hasHighlight(text: string): boolean {
    if (!text) return false;
    const target = 'For Common amenities and areas';
    return text.toLowerCase().includes(target.toLowerCase());
  }

  // Highlight (Main table)
  formatMilestone(text: string): string {
    if (!text) return '';

    const target = 'For Common amenities and areas';
    const idx = text.toLowerCase().indexOf(target.toLowerCase());

    if (idx >= 0) {
      return (
        text.substring(0, idx) +
        '<strong style="font-size:18px;">' +
        text.substring(idx, idx + target.length) +
        '</strong><br/>' +
        text.substring(idx + target.length)
      );
    }

    return text;
  }

  // Second table highlight check
  hasHighlightCommon(text: string): boolean {
    if (!text) return false;
    const target = 'For Commonandareas';
    return text.toLowerCase().includes(target.toLowerCase());
  }

  // Second table highlight
  formatMilestoneCommon(text: string): string {
    if (!text) return '';

    const target = 'For Commonandareas';
    const idx = text.toLowerCase().indexOf(target.toLowerCase());

    if (idx >= 0) {
      return (
        text.substring(0, idx) +
        '<strong style="font-size:18px;">' +
        text.substring(idx, idx + target.length) +
        '</strong><br/>' +
        text.substring(idx + target.length)
      );
    }

    return text;
  }

  formatDate(date: string): string {
    if (!date) return '';

    const parts = date.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`; // yyyy-MM-dd
    }

    // fallback (ISO case)
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  }


  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

}
