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
import { async } from 'rxjs';


@Component({
    selector: 'app-home',
  templateUrl: './MapSumary.component.html',
  styleUrls: ['./MapSumary.component.css'],
    standalone: false
})

export class MapSumaryComponent implements OnInit {
  searchModel = new GetUploadedDocumentsSPModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];
  pagedProjectList: any[] = [];
  parkingModel: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  docUrl: string = "";
  totalArea: number = 0;
  causeType: number = 0;
  MapID: string = "";
  isUnderProcess: string = "";
  model: any;
  mapBuildingList: any[] = [];
  processedBuildings: any[] = [];

  mapFinal: any = {
    PROPOSEDREVISIONADDALTERCLAUE1: 0,
    PROPOSEDREVISIONADDALTERCLAUE2: 0
  };

  isTab2Visible: boolean = false;
  isTab3Visible: boolean = false;

  chktermsID: boolean = true;
  totals = {
    NoOfCars: 0,
    NoOfTwoWeelers: 0,
    NoOfCycles: 0,
    MechanicalCarParking: 0,
    NoOfVisitorCarParking: 0,
    NoOfVisitorScooterParking: 0,
    CarParkingAllocated: 0,
    ScooterParkingAllocated: 0
  };

  total_sanctioned: number = 0;
  total_Notsanctioned: number = 0;

  
  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {

      this.MapID = params['MapID'];
      /*this.isUnderProcess = params['isUnderProcess'];*/

      await this.GetMapRevisionView();   
      await this.gettable();
      await this.calculateTotals();
      debugger;
      this.parkingModel = this.getParkingData();
      this.calculateAllTotals();

      this.cdr.markForCheck();
    });

   
    this.handleTabsVisibility();


  }



  async GetMapRevisionView() {
    
    this.model = null; 
    try {
      this.loaderService.requestStarted();
      debugger
      this.searchModel.id = 1;
      const data: any = await this.HomeService.GetMapRevisionView(this.MapID);
     
      console.log('API Response:', data);

      if (data) {
        this.model = data.data;
        this.totalArea = data.sumOfAreas;

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

  async gettable() {
    
    this.docUrl = this.commonMasterService.DocUrl;
    this.mapBuildingList = this.model._NewApartModel || [];
    if (this.mapBuildingList && this.mapBuildingList.length > 0) {
      this.mapBuildingList.forEach((item, index) => {
        this.generateBlocksData(
          item.NumberOfBlocks,
          item.NumberOfBlocksString,
          item.Name,
          index,
          item.apartblockNocomma
        );
      });
    }
  }
  formatDotNetDate(dotNetDate: string): string {

    if (!dotNetDate) return '';

    const timestamp = Number(dotNetDate.replace(/[^0-9]/g, ''));
    const date = new Date(timestamp);

    return date.toLocaleDateString('en-IN');
    // Change format if needed
  }

  generateBlocksData(
    numberOfBlocks: number,
    blockString: string,
    name: string,
    index: number,
    commaApartBlock: string
  ): void {


    let blockValueArray = blockString ? blockString.split(',') : [];
    let commaApartBlockArray = commaApartBlock ? commaApartBlock.split(',') : [];

    let num = 0;
    let itemCount = blockValueArray.length - 1;

    let blocks: any[] = [];

    for (let i = 0; i < numberOfBlocks; i++) {

      let basementValue = blockValueArray[num];
      let floorValue = blockValueArray[num + 1];

      let stiltValue =
        (itemCount === numberOfBlocks * 2)
          ? 0
          : blockValueArray[num + 2];

      basementValue = basementValue ?? '';
      floorValue = floorValue ?? '';
      stiltValue = stiltValue ?? '';

      blocks.push({
        blockLabel: commaApartBlockArray[i],
        basement: basementValue,
        floor: floorValue,
        stilt: stiltValue
      });

      num += (itemCount === numberOfBlocks * 2) ? 2 : 3;
    }

    this.processedBuildings.push({
      name: name,
      numberOfBlocks: numberOfBlocks,
      blocks: blocks
    });
  }

  handleTabsVisibility(): void {

    this.isTab2Visible = this.model.MapFinal.PROPOSEDREVISIONADDALTERCLAUE1 == 2;
    this.isTab3Visible = this.model.MapFinal.PROPOSEDREVISIONADDALTERCLAUE2 == 1;
  }
  async calculateTotals() {

    this.total_sanctioned = 0;
    this.total_Notsanctioned = 0;

    if (this.model?._NewApartModel) {

      this.model._NewApartModel.forEach((block: { Mapapartment: { sanctioned_NotSanctioned: boolean; NumberOfApartments: any; }[]; }) => {

        if (block.Mapapartment) {

          block.Mapapartment.forEach((apt: { sanctioned_NotSanctioned: boolean; NumberOfApartments: any; }) => {

            if (apt.sanctioned_NotSanctioned === true) {
              this.total_sanctioned += Number(apt.NumberOfApartments || 0);
            }

            if (apt.sanctioned_NotSanctioned === false) {
              this.total_Notsanctioned += Number(apt.NumberOfApartments || 0);
            }

          });

        }

      });

    }
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

  calculateAllTotals(): void {
    debugger;
    this.totals = {
      NoOfCars: 0,
      NoOfTwoWeelers: 0,
      NoOfCycles: 0,
      MechanicalCarParking: 0,
      NoOfVisitorCarParking: 0,
      NoOfVisitorScooterParking: 0,
      CarParkingAllocated: 0,
      ScooterParkingAllocated: 0
    };

    const data = Array.isArray(this.parkingModel[0])
      ? this.parkingModel[0]
      : this.parkingModel;

    data.forEach(item => {
      this.totals.NoOfCars += this.toNumber(item.NoOfCars);
      this.totals.NoOfTwoWeelers += this.toNumber(item.NoOfTwoWeelers);
      this.totals.NoOfCycles += this.toNumber(item.NoOfCycles);
      this.totals.MechanicalCarParking += this.toNumber(item.MechanicalCarParking);
      this.totals.NoOfVisitorCarParking += this.toNumber(item.NoOfVisitorCarParking);
      this.totals.NoOfVisitorScooterParking += this.toNumber(item.NoOfVisitorScooterParking);
      this.totals.CarParkingAllocated += this.toNumber(item.CarParkingAllocated);
      this.totals.ScooterParkingAllocated += this.toNumber(item.ScooterParkingAllocated);
    });
  }
  toNumber(value: any): number {
    return value ? parseInt(value, 10) : 0;
  }
  getParkingData() {
    debugger;
    return [
      this.model.parkingModel
    ]
  }


  getProposedTotal() {
    return this.model?.plotModel?.reduce((sum: number, item: any) => {
      return sum + (Number(item.ProposedNoofFloor) || 0);
    }, 0);
  }

  getBookedTotal() {
    return this.model?.plotModel?.reduce((sum: number, item: any) => {
      return sum + (Number(item.NumberofPlotBookedSold) || 0);
    }, 0);
  }
}


