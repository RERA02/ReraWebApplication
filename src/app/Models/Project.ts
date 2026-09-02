export interface Project {
  ProjectId: number;
  ProjectName: string;
  ProjectLocation: string;
  ProjectCategory: string;
  PromoterName: string;
  PromoterType: string;
  RegistrationNo: string;
  RcCertificatePath: string;
  StatusOfProject: string;
  DateofRegistration: string;
  PhaseArea: number;
  TotalBuildingCount: number;
  SanctionedbuildingCount: number;
  NotSanctionedbuildingCount: number;
  QRCodeImage: string;
  GetDocumentsList: any[];
  GetPreviousExtsList: any[];
  GetMapRevision: any[];
  GetQPRList: any[];
  GetAPRList: any[];
  GetSpecialModProfileList_New: any[];
  GetSpecialModProjectList_New: any[];
  Documents: any[];
  GetEncumbranceList_New: any[];
}
