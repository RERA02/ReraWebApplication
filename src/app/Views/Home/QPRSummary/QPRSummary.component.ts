import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';


@Component({
  selector: 'app-QPRSummary',
  templateUrl: './QPRSummary.component.html',
  styleUrls: ['./QPRSummary.component.css'],
  standalone: false
})

export class QPRSummaryComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
  public QPRApprovalStatuslist: any[] = [];

  public sSOLoginDataModel = new SSOLoginDataModel();
  docUrl: string = "";
  projectIdEnc: string = "";
  QuarterIdEnc: string = "";
  PT: number = 0;
  isUnderProcess: string = "";
  QPRPId: number = 0;
  public model: any;
  cnt = 0;
  summary: any;
  formattedLatestFormR3: string | null = null;


  LCost: number = 0;
  DCost: number = 0;

  IncurredLandC: number = 0;
  IncurredDevelopmentC: number = 0;
  LQIncurredLandC: number = 0;
  LQIncurredDevelopmentC: number = 0;
  LQCompletionOfConstWork: number = 0;
  CompletionOfConstWork: number = 0;
  LQCostIncurredOnLandCost: number = 0;
  CostIncurredOnLandCost: number = 0;
  LQCostIncurredOnConstructionCost: number = 0;
  CostIncurredOnConstructionCost: number = 0;

  EstimatedTotal: number = 0;
  EstimatedTotalA: number = 0;
  IncurredTotal: number = 0;
  IncurredTotalA: number = 0;
  LQIncurredTotal: number = 0;
  LQIncurredTotalA: number = 0;
  LEstimatedTotalA: number = 0;
  apartmentgrouped: any = {};
  PLOTTEDgrouped: any = {};

  apartmentGroupedList: any[] = [];
  PLOTTEDGroupedList: any[] = [];


  totalNumberofApartments: number = 0;
  totalBookedSoldAllottedLastQuarter: number = 0;
  totalBookedSoldAllottedCurrentQuarter: number = 0;
  groupedTypeAData: any[] = [];
  typeBList: any[] = [];
  groupedR2TypeAData: any[] = [];
  r2TypeBList: any[] = [];

  processedR3List: any[] = [];
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {

    console.log('Home');

    this.docUrl = this.commonMasterService.DocUrl;
    this.projectIdEnc = this.route.snapshot.queryParams['projectIdEnc'];
    this.QuarterIdEnc = this.route.snapshot.queryParams['QuarterIdEnc'];
    this.PT = this.route.snapshot.queryParams['PT'];


    await this.GetQPRSummaryWebSite();
    sessionStorage.clear();
    localStorage.clear();
    this.cdr.markForCheck();
  }


  async GetQPRSummaryWebSite() {

    try {

      this.loaderService.requestStarted();

      await this.homeService.QPRSummaryWebSite(this.projectIdEnc, this.QuarterIdEnc, this.PT)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data);
          this.QPRApprovalStatuslist = data.QPRApprovalStatuslist;


          this.model = data.data;


          this.LCost = this.model?.GetQPRR3Details?.LCost ?? 0;
          this.DCost = this.model?.GetQPRR3Details?.DCost ?? 0;
          this.LQIncurredLandC = this.model?.GetQPRR3Details.LQIncurredLandC ?? 0;
          this.LQIncurredDevelopmentC = this.model?.GetQPRR3Details.LQIncurredDevelopmentC ?? 0;
          this.IncurredDevelopmentC = this.model?.GetQPRR3Details.IncurredDevelopmentC ?? 0;
          this.IncurredLandC = this.model?.GetQPRR3Details.IncurredLandC ?? 0;

          this.LQCompletionOfConstWork = this.model?.GetQPRR3Details.LQCompletionOfConstWork ?? 0;
          this.CompletionOfConstWork = this.model?.GetQPRR3Details.CompletionOfConstWork ?? 0;
          this.EstimatedTotal = this.model?.GetQPRR3Details?.EstimatedTotal;

          this.calculateEstimatedTotal();
          this.calculateIncurredValues();

          this.prepareQPRData();
          this.prepareR2Data();
          this.prepareR3Data()
          this.calculateSummary();
          this.calculateR3Totals();
          this.apartmentGroups();
          this.plotGroups();
          this.formattedLatestFormR3 = this.formatDotNetDate(
            this.model?.GetQPRR3Details?.LatestFormR3
          );

          if (this.model?.GetQPRPartSecond?.GetBuildingDetails) {
            let totalRows = 0;


            this.model.GetQPRPartSecond.GetBuildingDetails.forEach((building: any) => {
              building.GetAppartmentDetails.forEach((apt: any) => {
                if (apt.sanctioned_NotSanctioned) totalRows++;
              });
            });


            if (!this.model.GetQPRPartSecond.Apartmentdtls) {
              this.model.GetQPRPartSecond.Apartmentdtls = [];
            }

            for (let i = 0; i < totalRows; i++) {
              if (!this.model.GetQPRPartSecond.Apartmentdtls[i]) {
                this.model.GetQPRPartSecond.Apartmentdtls[i] = { NoofAptBookedCurrentQ: 0 };
              }
            }
          }

          if (this.model?.GetQPRR3Details?.length > 0) {
            this.IncurredLandC = this.model.GetQPRR3Details[0].IncurredLandC;
          }

          this.calculateCostIncurredOnLandCost();
          this.calculateCostIncurredOnConstructionCost();
          this.calculateTotals();

          this.cdr.markForCheck();
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


  prepareQPRData() {
    debugger;
    const list = this.model?.GetQPRR1Details?.GetQPR1listNEW || [];

    // TYPE A GROUPING
    const grouped: any = {};

    list
      .filter((x: any) => x.TypeT === 'A')
      .forEach((item: any) => {

        const key = item.BuildingName;

        if (!grouped[key]) {
          grouped[key] = [];
        }

        grouped[key].push(item);

      });

    this.groupedTypeAData = Object.keys(grouped).map(key => ({
      buildingName: key,
      items: grouped[key]
    }));

    // TYPE B
    this.typeBList = list.filter((x: any) => x.TypeT === 'B');

  }

  prepareR2Data() {
    debugger;
    const list = this.model?.GetQPRR2Details?.GetQPRlistR2NEW || [];

    // TYPE A GROUPING
    const grouped: any = {};

    list
      .filter((x: any) => x.TypeT === 'A')
      .forEach((item: any) => {

        const key = item.BuildingName || 'Default';

        if (!grouped[key]) {
          grouped[key] = [];
        }

        grouped[key].push(item);

      });

    this.groupedR2TypeAData = Object.keys(grouped).map(key => ({
      buildingName: key,
      items: grouped[key]
    }));

    // TYPE B
    this.r2TypeBList = list.filter((x: any) => x.TypeT === 'B');

  }

  prepareR3Data() {

    const list = this.model?.GetQPRR3Details?.GetQPRlistNEWR3 || [];

    this.processedR3List = [];

    list.forEach((item: any) => {

      const fullText = item.NAMES || '';

      // LAND COST
      if (fullText.includes('(A) Land Cost')) {

        const remaining = fullText
          .replace('(A) Land Cost', '')
          .trim();

        // Heading
        this.processedR3List.push({
          isHeading: true,
          heading: '(A) Land Cost'
        });

        // Remaining Row
        if (remaining) {

          this.processedR3List.push({
            showDataRow: true,
            name: remaining,
            percentage: item.Percentage,
            east: item.East,
            isSubTotal: remaining.includes('Sub-Total')
          });

        }

      }

      // DEVELOPMENT COST
      else if (fullText.includes('(B) Development Cost')) {

        const remaining = fullText
          .replace('(B) Development Cost/ Cost of Construction:', '')
          .replace('(B) Development Cost', '')
          .trim();

        // Heading
        this.processedR3List.push({
          isHeading: true,
          heading: '(B) Development Cost/ Cost of Construction:'
        });

        // Remaining Row
        if (remaining) {

          this.processedR3List.push({
            showDataRow: true,
            name: remaining,
            percentage: item.Percentage,
            east: item.East,
            isSubTotal: remaining.includes('Sub-Total')
          });

        }

      }

      // NORMAL ROWS
      else {

        this.processedR3List.push({
          showDataRow: true,
          name: fullText,
          percentage: item.Percentage,
          east: item.East,
          isSubTotal: fullText.includes('Sub-Total')
        });

      }

    });

  }

  openDocument(path: string) {
    window.open(path, '_blank');
  }
  calculateTotals() {

    this.totalNumberofApartments = 0;
    this.totalBookedSoldAllottedLastQuarter = 0;
    this.totalBookedSoldAllottedCurrentQuarter = 0;

    if (!this.model?.building?.GetAppartmentDetails) return;

    const validApartments = this.model?.building.GetAppartmentDetails
      .filter((x: any) => x.sanctioned_NotSanctioned);

    validApartments.forEach((item: any) => {

      this.totalNumberofApartments += +item.NumberOfApartments || 0;
      this.totalBookedSoldAllottedLastQuarter += +item.NoofAptBookedLastQ || 0;

      const currentRecord = this.model?.GetQPRPartSecond?.Apartmentdtls
        ?.find((x: any) => x.ApartmentType === item.ApartmentType);

      this.totalBookedSoldAllottedCurrentQuarter +=
        +currentRecord?.NoofAptBookedCurrentQ || 0;
    });
  }


  getCurrentQuarterValue(apt: any): number {
    const apartments = this.model?.GetQPRPartSecond?.Apartmentdtls;
    if (!apartments?.length) return 0;

    const record = apartments.find((x: any) =>

      Number(x.Id) === Number(apt.Id)
    );

    if (!record) return 0;


    if (record.NoofAptBookedCurrentQ != null) return Number(record.NoofAptBookedCurrentQ);

    return 0;
  }

  //getCurrentQuarterValue(apt: any): number {

  //  const record = this.model?.GetQPRPartSecond?.Apartmentdtls?.find((x: any) =>
  //    x.ApartmentType?.trim() == apt.ApartmentType?.trim()
  //  );

  //  return record?.NoofAptBookedCurrentQ != null
  //    ? Number(record.NoofAptBookedCurrentQ)
  //    : 0;
  //}




  getBuildingTotals(building: any) {

    let totalApt = 0;
    let totalLastQ = 0;
    let totalCurrentQ = 0;

    (building?.GetAppartmentDetails || []).forEach((apt: any) => {

      if (apt.sanctioned_NotSanctioned) {

        totalApt += +apt.NumberOfApartments || 0;
        totalLastQ += +apt.NoofAptBookedLastQ || 0;
        totalCurrentQ += this.getCurrentQuarterValue(apt);

      }
    });

    return {
      totalApt,
      totalLastQ,
      totalCurrentQ
    };
  }




  calc(input: HTMLInputElement, m: number, totalApartments: number) {

    console.log(`Value changed in building ${m}, total apartments ${totalApartments}:`, input.value);
  }

  getTotal(field: string): number {
    if (!this.model?.GetQPRPartSecond?.ProjectCommonAreaDetails) return 0;
    return this.model.GetQPRPartSecond.ProjectCommonAreaDetails
      .reduce((sum: number, item: any) => sum + (item[field] || 0), 0);
  }

  yesNoMap = {
    1: 'Yes',
    0: 'No'
  };

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

  calculateSummary(): void {

    const details = this.model?.GetQPRR2Details;
    if (!details || details.ProjectType === 4) return;

    let summA = 0;
    let summB = 0;
    let lqSummA = 0;
    let lqSummB = 0;


    if (Array.isArray(details.GetQPRR2TBL_GetValue)) {

      details.GetQPRR2TBL_GetValue.forEach((row: any[]) => {

        if (!Array.isArray(row)) return;


        summA += Number(row[0]?.Amount || 0);
        lqSummA += Number(row[0]?.LQAmount || 0);


        summB += Number(row[1]?.Amount || 0);
        lqSummB += Number(row[1]?.LQAmount || 0);

      });
    }


    const valT1 = Number(details.GetR2tbl2?.[0]?.Amount || 0);
    const valT2 = Number(details.GetR2tbl2?.[1]?.Amount || 0);
    const lvalT1 = Number(details.GetR2tbl2?.[0]?.LQAmount || 0);
    const lvalT2 = Number(details.GetR2tbl2?.[1]?.LQAmount || 0);

    const totalA = summA + valT1;
    const totalB = summB + valT2;
    const lqTotalA = lqSummA + lvalT1;
    const lqTotalB = lqSummB + lvalT2;

    const per = totalA > 0 ? (totalB / totalA) * 100 : 0;
    const lqPer = lqTotalA > 0 ? (lqTotalB / lqTotalA) * 100 : 0;

    this.summary = {
      tdSummA: totalA,
      tdSummB: totalB,
      LtdSummA: lqTotalA,
      LtdSummB: lqTotalB,
      tdPer: Number(per.toFixed(0)),
      LtdPer: Number(lqPer.toFixed(0))
    };
  }
  parseDotNetDate(dateString: string | null | undefined): Date | null {
    if (!dateString) return null;

    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateString);
    if (!match) return null;

    return new Date(parseInt(match[1], 10));
  }

  calculateR3Totals() {
    const r3 = this.model?.GetQPRR3Details;
    if (!r3) return;

    r3.EstimatedTotal =
      Number(r3.LCost || 0) +
      Number(r3.DCost || 0);

    r3.LQIncurredTotal =
      Number(r3.LQIncurredLandC || 0) +
      Number(r3.LQIncurredDevelopmentC || 0);

    r3.IncurredTotal =
      Number(r3.IncurredLandC || 0) +
      Number(r3.IncurredDevelopmentC || 0);
  }

  ProposedList: any[] = [
    { Value: 1, Text: 'Yes' },
    { Value: 0, Text: 'No' }
  ];

  formatDotNetDate(dateString: string | null | undefined): string | null {
    if (!dateString) return null;

    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateString);
    if (!match) return null;

    const date = new Date(Number(match[1]));

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }



  getR2DocumentUrl(path: string | null | undefined): string {

    if (!path) {
      return '#';
    }

    return this.docUrl + path.replace('..', '');
  }



  plotGroups() {
    if (!this.model?.GetApartmentAllotteeDetailsList) return [];



    this.model.GetApartmentAllotteeDetailsList.forEach((x: { PlotId: string | number; PlotType: any; TotalPlots: any; Plots_booked_allotted_sold: any; }) => {
      if (!this.PLOTTEDgrouped[x.PlotId]) {
        this.PLOTTEDgrouped[x.PlotId] = {
          PlotType: x.PlotType,
          TotalPlots: x.TotalPlots,
          Plots_booked_allotted_sold: x.Plots_booked_allotted_sold,
          items: []
        };
      }
      this.PLOTTEDgrouped[x.PlotId].items.push(x);
    });
    this.PLOTTEDGroupedList = Object.values(this.PLOTTEDgrouped);
    return Object.values(this.PLOTTEDgrouped);
  }



  apartmentGroups() {

    if (!this.model?.GetApartmentAllotteeDetailsList) return [];



    this.model.GetApartmentAllotteeDetailsList
      .filter((x: { ApartmentId: null; }) => x.ApartmentId != null)
      .forEach((x: { ApartmentId: string | number; BuildingName: any; ApartmentName: any; Block: any; CarpetArea: any; NumberOfApartments: any; BookedApartment: any; }) => {

        if (!this.apartmentgrouped[x.ApartmentId]) {
          this.apartmentgrouped[x.ApartmentId] = {
            BuildingName: x.BuildingName,
            ApartmentName: x.ApartmentName,
            Block: x.Block,
            CarpetArea: x.CarpetArea,
            NumberOfApartments: x.NumberOfApartments,
            BookedApartment: x.BookedApartment,
            items: []
          };
        }

        this.apartmentgrouped[x.ApartmentId].items.push(x);
      });
    this.apartmentGroupedList = Object.values(this.apartmentgrouped);
    return Object.values(this.apartmentgrouped);
  }




  calculateEstimatedTotal() {
    const num1 = this.LCost;
    const num2 = this.DCost;

    const result = num1 + num2;

    if (!isNaN(result)) {
      this.EstimatedTotal = parseFloat(result.toFixed(0));
      this.EstimatedTotalA = parseFloat(result.toFixed(0));
    }
  }


  calculateIncurredValues() {


    const num1 = this.IncurredLandC ?? 0;
    const num2 = this.IncurredDevelopmentC ?? 0;
    const incurredTotal = num1 + num2;
    if (!isNaN(incurredTotal)) {
      this.IncurredTotal = parseFloat(incurredTotal.toFixed(0));
      this.IncurredTotalA = parseFloat(incurredTotal.toFixed(0));
    }


    const num3 = this.LQIncurredLandC ?? 0;
    const num4 = this.IncurredLandC ?? 0;

    const LQIncurredTotal = num3 + num4;
    if (!isNaN(LQIncurredTotal)) {
      this.LQIncurredTotal = parseFloat(LQIncurredTotal.toFixed(0));
      this.LQIncurredTotalA = parseFloat(LQIncurredTotal.toFixed(0));
    }
    if ((num3 == 0 && this.LCost === 0) || (this.LCost == 0)) {
      this.LEstimatedTotalA = 0;
    } else {
      this.LEstimatedTotalA = Math.round((num3 / this.LCost) * 100) || 0;
    }

    if ((num4 == 0 && this.LCost === 0) || (this.LCost == 0)) {
      this.EstimatedTotalA = 0;
    } else {
      this.EstimatedTotalA = Math.round((num4 / this.LCost) * 100) || 0;
    }

    //if ((num3 ==0 && this.LCost === 0) || (this.LCost ==0)) {
    //  this.LEstimatedTotalA = 0;
    //} else {
    //  this.LEstimatedTotalA = ((num3 / this.LCost) * 100) || 0;
    //}


    //if ((num4 == 0 && this.LCost === 0) || (this.LCost == 0) ) {
    //  this.EstimatedTotalA = 0;
    //} else {
    //  this.EstimatedTotalA = ((num4 / this.LCost) * 100) || 0;
    //}


    const dLCost = this.DCost ?? 0;
    const dnum3 = this.LQIncurredDevelopmentC ?? 0;
    const dnum4 = this.IncurredDevelopmentC ?? 0;

    this.LQIncurredTotalA = dLCost === 0 ? 0 : ((dnum3 / dLCost) * 100) || 0;
    this.LQIncurredTotalA = dLCost === 0 ? 0 : Math.round((dnum3 / dLCost) * 100);

    this.IncurredTotalA = dLCost === 0 ? 0 : Math.round((dnum4 / dLCost) * 100);
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


  //formatDate(date: any): string {

  //  if (!date) return '';

  //  const d = new Date(date);

  //  if (isNaN(d.getTime())) return '';

  //  const day = ('0' + d.getDate()).slice(-2);
  //  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  //  const year = d.getFullYear();

  //  return `${day}/${month}/${year}`;
  //}
  formatDate1(date: any): string {

    if (!date) return '';

    const d = new Date(date);

    if (isNaN(d.getTime())) return '';

    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }


  calculateCostIncurredOnLandCost() {

    // Normal Calculation

    if (this.IncurredLandC && this.EstimatedTotal) {
      this.CostIncurredOnLandCost =
        Math.round((this.IncurredLandC * 100) / this.EstimatedTotal);
    } else {
      this.CostIncurredOnLandCost = 0;
    }

    // LQ Calculation
    if (this.LQIncurredLandC && this.EstimatedTotal) {
      this.LQCostIncurredOnLandCost =
        Math.round((this.LQIncurredLandC * 100) / this.EstimatedTotal);
    } else {
      this.LQCostIncurredOnLandCost = 0;
    }
  }


  calculateCostIncurredOnConstructionCost() {

    const priceOne = this.IncurredDevelopmentC || 0;
    const priceTwo = this.EstimatedTotal || 0;

    if (priceTwo === 0) {
      this.CostIncurredOnConstructionCost = 0;
    } else {
      this.CostIncurredOnConstructionCost =
        Number(((priceOne * 100) / priceTwo).toFixed(0));
    }

    // LQ calculation
    const LQpriceOne = this.LQIncurredDevelopmentC || 0;
    const LQpriceTwo = this.EstimatedTotal || 0;

    if (LQpriceTwo === 0) {
      this.LQCostIncurredOnConstructionCost = 0;
    } else {
      this.LQCostIncurredOnConstructionCost =
        Number(((LQpriceOne * 100) / LQpriceTwo).toFixed(0));
    }
  }

  openR1File(filePath: string): void {
    if (!filePath) {
      return;
    }
    const file = filePath.replace(/~/, '');
    const url = `https://reraapp.rajasthan.gov.in${file}`;

    window.open(url, '_blank');
  }
  openR2File(filePath: string): void {
    if (!filePath) {
      return;
    }
    const file = filePath.replace(/~/, '');
    const url = `https://reraapp.rajasthan.gov.in${file}`;

    window.open(url, '_blank');
  }
  openR3File(filePath: string): void {
    if (!filePath) {
      return;
    }
    const file = filePath.replace(/~/, '');
    const url = `https://reraapp.rajasthan.gov.in${file}`;

    window.open(url, '_blank');
  }
  maskName(name: string): string {
    if (!name) return '-';

    const parts = name.trim().split(' ');

    if (parts.length < 2) {
      return name.length > 2
        ? name.substring(0, 2) + '*'.repeat(name.length - 2)
        : name;
    }

    const firstName = parts[0].length > 2
      ? parts[0].substring(0, 2) + '*'.repeat(parts[0].length - 2)
      : parts[0];

    const lastName = parts[1].length > 2
      ? '*'.repeat(parts[1].length - 2) + parts[1].slice(-2)
      : parts[1];

    return `${firstName} ${lastName}`;
  }
  

}

