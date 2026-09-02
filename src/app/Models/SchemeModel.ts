export class VerificationRequestModel {
  ApplicationNo: string = '';
  public ApplicationDetails: ApplicationDetail[] = [];
  public SchemeDocumentList: SchemeDocumentModel[] = [];
  ActionId: number = 0;
  RejectReasonID: number = 0;
  Remarks: string="";
  UserID: number = 0;
  AppWorkflowId: number = 0;
}

export class CheckedVerificationRequestModel {
  ApplicationNo: string = '';
  ActionId: number = 0;
  UserID: number = 0;
  AppWorkflowId: number = 0;
}

export class SchemeDocumentModel {
  DocumentMasterId: number = 0;
  DocumentMasterEn: string = "";
  SchemeID: number = 0;
  JobSeekerID: number = 0;
  RoleId: number = 0;
  SchemeDocumentID: number = 0;
  DocumentPath: string = "";
  DocumentStatus: string = "";  
  IsDocumentReject: boolean = false;
  DocumentReasonId: number = 0;
  DocumentRemarks: string = "";
}

export class ApplicationDetail {
  AadharNo: string ='';
  ApplicationNo: string ='';
  Category: string ='';
  DOB: string ='';
  DocumentMasterEn: string ='';
  DocumentMasterHi: string ='';
  DocumentMasterId: number =0;
  DocumentPath: string ='';
  EFPONumber: string = '';
  Email: string = '';
  FatherName: string = '';
  FullName: string = '';
  Gender: string = '';
  JanAadhaarNo: string = '';
  JanMemberId: string = '';
  JobSeekerAppliedSchemeId: number = 0;
  JobSeekerID: number = 0;
  MaritalStatus: string = '';
  MobileNo: string = '';
  Salutation: string = '';
  SchemeName: string = '';
  ShortName: string = '';
  UserID: number = 0;
  UserImageUrl: string = '';
  // 👉 Additional fields for verification UI:
  DocumentStatus: string = '';         // A or R
  RejectReasonID: number = 0;         // Selected reason ID
  Remarks: string = '';                              // Remark text
}
export interface VerificationRequestModel {
  Applications: VerificationDocument[];
  Action: number;
  RejectionRemarks: string;
  UpdatedByUserID: number;
}

export interface VerificationDocument {
  ApplicationNo: string;
  JobSeekerID: number;
  DocumentMasterId: number;
  DocumentStatus: string;
  Remarks: string;
  RejectReasonID: number;
}
