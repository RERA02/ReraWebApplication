import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { HomeService } from '../../../Services/Home/home.service';
import { ProjectSearchModel } from '../../../Models/Master';
import { Project } from '../../../Models/Project';


@Component({
  selector: 'app-home',
  templateUrl: './ProjectDetail.component.html',
  styleUrls: ['./ProjectDetail.component.css'],
  standalone: false
})

export class ProjectDetailComponent implements OnInit {
  searchModel = new ProjectSearchModel();

  DistrictList: any[] = [];
  TehsilList: any[] = [];
  ProjectList: any[] = [];

  pagedProjectList: any[] = [];
  cutoffDate = new Date('2024-03-27');
  isApprovedBeforeCutoff = false;
  projectInfo: any[] = [];
  extensions: any[] = [];
  encumbrances: any[] = [];
  revocations: any[] = [];
  documentTypes: any[] = [];
  documentList: any;
  model: any;
  GetPreviousExtsList: any;
  GetMapRevision: any;
  GetQPRList: any;
  GetAPRList: any;
  GetSpecialModProfileList_New: any;
  GetSpecialModProjectList_New: any;
  GetEncumbranceList_New: any;
  hasValidDocuments = false;
  Project: number = 0;
  valFloor: number = 0;

  project: Project | null = null;
  selectedTab: string = 'overview';
  public docUrl: string = '';
  public qrCode: string = '';
  ProjectDataList: any[] = [];
  public projectStatus: string = '';
  public LocationUrl: string = '';
  today: Date = new Date();
  formattedToday: string | null = '';
  projectModel: any;
  constructor(
    private router: Router, private cdr: ChangeDetectorRef,
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) {

  }

  //ngOnInit(): void {
  //  this.loaderService.requestStarted();
  //  this.route.queryParams.subscribe(params => {
  //    this.Project = params['id'] || 0;
  //    this.GetComponentsNew();
  //    this.GetProjectList();

  //  });
  //}



  ngOnInit(): void {

    const ProjectId = this.route.snapshot.queryParams['id'];
    if (ProjectId) {
      this.getProjectDetails(ProjectId);
      this.GetProjectDtlsWebsite(ProjectId)
      this.getProjectQrCodeShow(ProjectId);
      this.Get_ProjectStatus(ProjectId);
      this.Get_Location(ProjectId);
    }
    const day = String(this.today.getDate()).padStart(2, '0');
    const month = String(this.today.getMonth() + 1).padStart(2, '0');
    const year = this.today.getFullYear();

    this.formattedToday = `${day}/${month}/${year}`;
    this.docUrl = this.commonMasterService.DocUrl;
  }

  getProjectDetails(ProjectId: string): void {

    this.loaderService.requestStarted();

    this.HomeService.getProjectById(ProjectId).subscribe({
      next: (res) => {

        this.project = res;
        console.log(this.project);
        debugger
        const data = res?.Data;

        this.projectInfo = data?.Project ?? [];
        this.extensions = data?.Extension ?? [];
        this.encumbrances = data?.Encumbrance ?? [];
        this.revocations = data?.Revocation ?? [];
        this.documentTypes = data?.DocumentType ?? [];
        this.cdr.markForCheck();
      },



      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loaderService.requestEnded();
      }
    });


  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  trackByIndex(index: number) {
    return index;
  }

  async GetProjectDtlsWebsite(Id: string) {
    try {
      debugger
      this.loaderService.requestStarted();

      const res: any = await this.HomeService.GetProjectDtlsWebsite(Id);
      this.model = res?.data;
      console.log(this.model);
      this.setDocuments(res?.data?.GetDocumentsList);
      this.GetPreviousExtsList = res?.data?.GetPreviousExtsList;

      this.GetSpecialModProfileList_New = res?.data?.GetSpecialModProfileList_New;
      this.GetSpecialModProjectList_New = res?.data?.GetSpecialModProjectList_New;
      this.GetEncumbranceList_New = res?.data?.GetEncumbranceList_New;


      this.GetMapRevision = res?.data?.GetMapRevisionnew;
      this.GetQPRList = res?.data?.GetQPRList;
      this.GetAPRList = res?.data?.GetAPRList;

      this.ViewAgentData(this.model?.ProjectId, "U");


      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  setDocuments(data: any[]) {
    this.documentList = data || [];

    this.hasValidDocuments = this.documentList.some((d: any) =>
      d.ApplicationDocumentName !== 'Document Not Found' &&
      d.DocumentUrl &&
      d.DocumentUrl.trim() !== ''
    );
  }


  openDocument(doc: any) {
    if (doc.DocumentUrl) {
      const fullUrl = this.docUrl + doc.DocumentUrl.substring(1);
      window.open(fullUrl, '_blank');
    }
  }

  async getProjectQrCodeShow(ProjectId: number) {

    this.loaderService.requestStarted();
    const data: any = await this.HomeService.GetProjectQrCode(ProjectId);
    this.qrCode = data['qrCode'];
  }
  async Get_ProjectStatus(ProjectId: string) {
    this.loaderService.requestStarted();
    debugger
    try {
      const response: any = await this.HomeService.Get_ProjectStatus(ProjectId);

      if (response?.State == 1) {
        this.projectStatus = response.Data[0].PStatus;

      } else {
        this.projectStatus = '';

      }
      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    }

    this.loaderService.requestEnded();
  }


  openDocumentprojectInfo(path: string | undefined | null): void {
    debugger
    if (!path) {
      return;
    }
    const url = this.docUrl + path.replace('../', '');
    window.open(url, '_blank');
  }

  convertMvcDate(dateStr: string): Date | null {

    if (!dateStr) return null;

    const matches = /Date\((\d+)\)/.exec(dateStr);

    return matches ? new Date(+matches[1]) : null;
  }

  async GoToProjectExtensionView(proExtId: string) {
    debugger
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['/ProjectExtensionView'],
        {
          queryParams: {
            ProExtId: proExtId,
            isUnderProcess: ''
          }
        }
      )
    );

    window.open(url, '_blank');
  }

  async GoToProModSummaryView(Id: string) {
    debugger
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['/ProModSummary'],
        {
          queryParams: {
            ID: Id
          }
        }
      )
    );

    window.open(url, '_blank');
  }

  //async GoToSpecial_ModificationProfileSummary(Id: number, Uid: number) {
  //  debugger;

  //  const url = this.router.serializeUrl(
  //    this.router.createUrlTree(
  //      ['/Special_ModificationProfileSummary'],
  //      {
  //        queryParams: {
  //          Id: Id,
  //          Uid: Uid
  //        }
  //      }
  //    )
  //  );

  //  window.open(url, '_blank');
  //}


  async goToAPRSummary(projectId: string, finYearId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['APRSummary'],
        {
          queryParams: {
            projectId: projectId,
            QID: finYearId
          }
        }
      )
    );

    window.open(url, '_blank');
  }

  async goToQPRSummary(PROJECTID: string = "", QuarterId: string = "", PT: number = 0) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        ['QPRSummary'],
        {
          queryParams: {
            projectIdEnc: PROJECTID,
            QuarterIdEnc: QuarterId,
            PT: PT
          }
        }
      )
    );

    window.open(url, '_blank');
  }


  //async ViewAgentData(Id: string, Type: string) {

  //  try {

  //    this.loaderService.requestStarted();

  //    const data: any =
  //      await this.HomeService.ViewProjectWebsite(Id, Type);
  //    this.projectModel = data;



  //    this.cdr.markForCheck();
  //  } catch (error) {
  //    console.error(error);
  //  } finally {
  //    setTimeout(() => {
  //      this.loaderService.requestEnded();
  //    }, 200);
  //  }
  //}

  async ViewAgentData(Id: string, Type: string) {

    try {

      this.loaderService.requestStarted();

      const data: any =
        await this.HomeService.ViewProjectWebsite(Id, Type);
      this.projectModel = data;
      console.log(data);


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

      //if (building) {
      //  this.prepareBlockDetails(building);
      //}

      this.projectModel?.GetBuildingDetails?.forEach((building: any) => {
        this.prepareBlockDetails(building);


        let totalFloor = 0;

        if (building.BlockDetails && building.BlockDetails.length > 0) {

          building.BlockDetails.forEach((b: any) => {
            totalFloor += Number(b.floor || 0);
          });

        }

        this.valFloor = totalFloor;
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



  getSum(field: string): number {
    const data = this.projectModel?.ProjectCommanArea?.ProjectCommonAreaDetails || [];

    return data.reduce((sum: number, item: any) => {
      return sum + (item[field] || 0);
    }, 0);
  }

  async Get_Location(ProjectId: string) {
    this.loaderService.requestStarted();
    debugger
    try {
      const response: any = await this.HomeService.Get_Location(ProjectId);

      if (response?.State == 1) {
        this.LocationUrl = response.Data[0].LocationUrl;

      } else {
        this.LocationUrl = '';

      }
      this.cdr.markForCheck();
    } catch (error) {
      console.error(error);
    }

    this.loaderService.requestEnded();
  }


  async ShowLoaction(url: string) {
    if (url) {
      window.open(url, '_blank'); // opens in new tab
    }
  }
}
