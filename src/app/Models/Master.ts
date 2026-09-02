export class MasterEntity {
  public AID: number = 0;
  public UserID: number = 0;
  public SkillId: number = 0;
  public UniversitynameEng: string = '';
  public UniversitynameHin: string = '';
  public StateId: number = 0;
  public DistrictId: number = 0;
  public ModifyBy: number = 0;
  public CreatedBy: number = 0;
  public SkillnameEng: string = '';
  public SkillnameHin: string = '';
  public EID: string = '';
  public IsActive: number = 0;
  public ParentId: number = 0;
  public JobId: number = 0;
  public JobnameEng: string = '';
  public JobnameHin: string = '';
  public UniversityId: number = 0;
  public CommonID: number = 0;
  public Name: string = '';
  public NameHI: string = '';
  public Type: string = '';
  public SortOrder: number = 0;

}
export class MasterFilterEntity {
  public AID: number = 0;
  public UserID: number = 0;
  public UnversitynameEng: string = '';
  public UnversitynameHin: string = '';
  public StateId: number = 0;
  public DistrictId: number = 0;
  public ModifyBy: number = 0;
  public CreatedBy: number = 0;
  public SkillId: number = 0;
  public searchText: string = '';
  public CommonID: number = 0;
}

export interface MasterInterfaceEntity {
  ParentId: number,
  SkillnameEng: string,
  SkillnameHin: string,
  UserID: number,
  SkillId: number
}

export interface JobInterfaceEntity {
  ParentId: number,
  JobnameEng: string,
  JobnameHin: string,
  UserID: number,
  JobId: number
}

export interface UniversityInterfaceEntity {
  UniversityId: number,
  StateId: number,
  DistrictId: number,
  UniversitynameEng: string,
  UniversitynameHin: string,
  UserID: number
}
export interface CollegeInterfaceEntity {
  UniversityId: number,
  StateId: number,
  DistrictId: number,
  CollegenameEng: string,
  CollegenameHin: string,
  UserID: number
  // CollegeId: number
}


export interface CommonEntity {
  CommonID: number,
  Name: string,
  NameHI: string,
  Type: string,
  SortOrder: number,
  UserID: number,
  IsActive: boolean

}

export class ProjectSearchModel {
  districtId: number | null = 0;
  tehsilId: number | null = 0;
  projectName: string | null = null;
  promoterName: string | null = null;
  registrationNo: string | null = null;
  OrderPassedby: string | null = null;
  projectType: number = 0;
  status: number = 0;
  year: number = 0;
  applicationstatus: number | null = 0;
}

export class Web_TBL_AUDITTRAILSearchModel {
  public Projectid: number = 0;
  public TableId: number = 0;
  public Type: number = 0;

}
export class AgentSearchModel {
  districtId: number | null = 0;
  tehsilId: number | null = 0;
  agentName: string | null = null;
  registrationNo: string | null = null;
}
export class Web_GetAllNoticeSearModel {
  public Action: string = '';
  public ComplaintNumber: string = '';
}
export class ComplaintAdjudicatingPDF {
  id: number = 0;
  actiontype: number = 0;
  fileName: string = '';
}

export class ComplaintAdjudicatingOfficerModel {
  Id: number = 0;
  TypeId: number = 0;
  ComplaintNumber: string = '';
  ClaimFillingNumber: string = '';
  ClaimNumber: string = '';

  ApplicantName: string = '';
  ApplicantOffice: string = '';
  ApplicantService: string = '';
  ApplicantMobilieNumber: string = '';
  ApplicantEmail: string = '';
  ApplicantAllotment: string = '';

  RespondentName: string = '';
  RespondentOffice: string = '';
  RespondentService: string = '';
  RespondentMobileNumber: string = '';
  RespondentEmail: string = '';
  RespondentRegistrationNumber: string = '';
  RespondentProjectAddress: string = '';

  Jurisdication: string = '';
  FactOfCase: string = '';
  Grounds: string = '';
  ReliefSought: string = '';
  NotPendingMatter: string = '';

  Amount: string = '';
  BankName: string = '';
  BankerChequeNumber: string = '';
  DetailsOfPayment: string = '';

  AuthenicatedCopyUrl: string = '';
  DocumentsCopiesUrl: string = '';
  OtherDocumentsUrl: string = '';
  IndexOfDocuments?: number;

  FullName: string = '';
  FatherName: string = '';
  Year?: number;
  Residanse: string = '';
  Place: string = '';
  FillingDate?: Date;

  ViewType: string = '';
  PreForm: string = '';
  Listofenclosures: string = '';
  IterimOrderDetails: string = '';
  ComplaintPendingWithOtherCourtDetails: string = '';
  PaymentStatus?: boolean;

  ApplicantResidenceOffice: string = '';
  AdvocateMobileNo: string = '';
  AdvocateName: string = '';
  AdvocateEmail: string = '';

  CAMobileNo: string = '';
  CAName: string = '';
  CAEmail: string = '';

  DistrictId: number = 0;
  RERARespondentService: string = '';
  TempComplaintNo: string = '';

  MultipleComplainantName: string = '';
  MultipleRespondantName: string = '';
}

export class ComplaintDocumentUploadsS_M {
  ComplaintNumber: string = '';
}


export class ComplaintdetailsSearchModel {
  complaint_status: string = '';
  ComplaintTypeId: number = 0;

  compalaint_no: string = '';

  respondent_name: string = '';
  complainant: string = '';
}


export class GetUploadedDocumentsSPModel {
  id: number = 0;
  complientNo?: string;
  PartyName?: string;
  OrderfromDate?: string;
  OrdertoDate?: string;
  DocumentName?: string;
  Commontext?: string;
  FinYearId: number = 0;
  causeListType: number = 0;
  OrderNumber?: string;

}

//export class AgentProfileSummaryModel {

//  _ProjectList: ProjectVM[] = [];
//  _audit: TBL_AUDITTRAIL[] = [];

//  UserFlag: number = 0;

//  IndividualProfile: IndividualProfileModel | null = null;
//  IndividualProfileNew: IndividualProfileModel | null = null;

//  OtherProfile: OtherProfileModel | null = null;
//  OtherProfileNew: OtherProfileModel | null = null;

//  TypeMod: number = 0;
//  UserRole: number = 0;
//  ProfileType: number = 0;

//  ApplicationNo: string = '';
//  RegistrationNo: string = '';
//  ProfileTypeName: string = '';

//  OtherProfilePartnerList: OtherProfilePartnerListModel[] = [];
//  AgentDocumentList: AgentDocumentUploadsVM[] = [];
//  AgentSummaryPastExperience: PastExperienceDetailsModel[] = [];
//  AgentBranchDetails: BranchDetailsModel[] = [];

//  GMPayStusM: generalModificationPaymentStatus[] = [];

//  Amount: number = 0;
//  PaymentStatus: string = '';
//  PaymentId: number | null = null;
//  PaymentStatusId: number = 0;

//  IsSendToAdmin: boolean = false;

//  UserId: number = 0;
//  TypeId: number = 0;

//  PenaltyAmount: number = 0;
//  PenaltyPaymentId: number | null = null;
//  PenaltyPaymentStatus: string = '';

//  ProjectDetails: ProjectsDetailsModel[] = [];

//  Agent_BankName: string = '';
//  Agent_AccNo: string = '';
//  Agent_IFSC: string = '';
//  Agent_PassbookUpload: string = '';

//  GMApplicationNo: string = '';
//  PaymentDate: string = '';
//}


//export class ProjectVM {

//  FormD: string = '';
//  Id: number = 0;
//  UserId: number = 0;
//  SrNo: number = 0;
//  UserFullName: string = '';
//  Status: number = 0;
//  Statusname: string = '';
//  Name: string = '';
//  ProjectType: number = 0;
//  ProjectSubtype: number | null = null;
//  ProjectTypeName: string = '';

//  DateOfComplation: Date | null = null;
//  RevisedDateOfComplation: Date | null = null;
//  EstimatedCompletionDate: string = '';
//  ActualCompletionDate: string = '';

//  Litigations: boolean = false;
//  PlotNo: string = '';
//  Area: number = 0;
//  AggregateAreaOpenSpace: number | null = null;

//  TotalBuildingCount: number | null = null;
//  SanctionedbuildingCount: number | null = null;
//  NotSanctionedbuildingCount: number | null = null;

//  BoundariesEast: number | null = null;
//  BoundariesWest: number | null = null;
//  BoundariesSouth: number | null = null;
//  BoundariesNorth: number | null = null;

//  BuiltUpAreaFSI: number | null = null;
//  NotApprovedBuiltUpAreaFSI: number | null = null;

//  TotalFSI: number = 0;
//  State: number = 0;
//  Division: number = 0;
//  Taluka: number = 0;
//  District: number = 0;
//  Village: number = 0;

//  StateName: string = '';
//  DivisionName: string = '';
//  TalukaName: string = '';
//  DistrictName: string = '';
//  VillageName: string = '';

//  PinCode: string = '';
//  CreatedOn: Date | null = null;
//  IsActive: boolean = false;

//  BankName: string = '';
//  BranchName: string = '';
//  IFSCCode: string = '';
//  BankAccountNo: string = '';
//  BankAddress: string = '';
//  RegistrationNo: string = '';

//  ProjectStatus: number | null = null;
//  Comment: string = '';

//  PaymentTypeId: number = 0;
//  Fees: number | null = null;
//  PaymentType: string = '';

//  CheckBankName: string = '';
//  CheckNumber: string = '';
//  CheckIssuedDate: Date | null = null;

//  DDNumber: string = '';
//  DDBankName: string = '';
//  DDIssuedDate: Date | null = null;

//  TransactionId: string = '';

//  PaymentStatus: number | null = null;
//  IsSendToAdmin: number | null = null;
//  SendToAdminOn: Date | null = null;
//  PaymentId: number | null = null;

//  WardNumber: string = '';
//  StreetName: string = '';
//  PostOffice: string = '';
//  IsSendToAdminStatus: string = '';
//  ApplicationNo: string = '';

//  RefundRequestId: number | null = null;
//  ApprovedOn: Date | null = null;
//  RegistrationDate: string = '';

//  AadharNumber: string = '';
//  UploadedCertificatePath: string = '';

//  PStatus: string = '';
//  PType: string = '';
//  PSendToAdminOn: string = '';
//  PNR: string = '';

//  PaymentOn: Date | null = null;
//  GMApplicationNo: string = '';

//  RoleDistrict: string = '';
//  RoleModule: string = '';
//  RoleDesgination: string = '';
//  RoleDistrirctIDS: string = '';

//  AppStatus: string = '';
//  WORKFLOWMULTIPLE: string = '';

//  MstStatusId: number = 0;
//  aDDiPenaltyPay: number | null = null;
//  noticestatus: number | null = null;

//  Filepath: string = '';
//  Hearingnoticestatus: number | null = null;
//  HearingFilepath: string = '';

//  Responsestatus: number | null = null;
//  Judgementstatus: number | null = null;

//  ComplaintId: number | null = null;
//  ComplaintTypeid: number | null = null;
//  UserRoleId: number | null = null;

//  ComplaintNumber: string = '';
//  PostApprovalStatus: number | null = null;

//  ApplicationId: number = 0;
//  src: string = '';
//  category: string = '';

//  ProjectId: number | null = null;
//  Reason: number | null = null;
//  QuarterId: number | null = null;
//  FinyearId: number | null = null;
//  AppID: number | null = null;

//  QPRstatusinNumber: number = 0;
//  APRstatusinNumber: number = 0;

//  FormD_UploadedPath: string = '';
//  RevocationOrderNo: string = '';
//  DayCount: number = 0;

//  PromoterName: string = '';

//  MobileNo: number | null = null;
//  Email: string = '';

//  ProjectMobileNo: string = '';
//  ProjectEmailId: string = '';
//  OfficeNo: string = '';

//  PlotNumber_Address: string = '';
//  StreetName_Address: string = '';
//  VillageName_Address: string = '';

//  StateProvinceId_Address: number | null = null;
//  DistrictId_Address: number | null = null;
//  Taluka_Address: number | null = null;

//  ZipPostalCode_Address: string = '';
//  ProjectSpecialConditionDate: string = '';
//}


//export class TBL_AUDITTRAIL {

//  TABLEID: number = 0;
//  ProjectId: number = 0;

//  Comment: string = '';
//  TYPEFOR: number = 0;

//  StatusDate: Date | null = null;
//  Status: number | null = null;

//  STATUSNAME: string = '';
//  CREATEDBY: string = '';
//  DOCUMENT: string = '';

//  PARA: number | null = null;

//  Owner_Id: number = 0;

//  ToUserID: number | null = null;
//  ToUserName: string = '';

//  Duration: number | null = null;
//  DurationType: string = '';

//  SpecialComment: string = '';

//  bot: number | null = null;
//  pullback: number | null = null;

//  PaymentType: string = '';
//  Amount: number | null = null;
//}

export class Model {
  userId: number = 0;
  TypeMod: number = 0;
  ProfileType: number = 0;
  profileType: number = 0;

  profileTypeName: string = '';
  applicationNo: string = '';
  userRole: number = 0;

  individualProfile: IndividualProfileModel = new IndividualProfileModel();
}

export class IndividualProfileModel {
  // Personal details
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  fatherName: string = '';
  panNumber: string = '';
  aadharNumber: string = '';

  // Firm details
  proprietorshipFirmName: string = '';
  proprietorName: string = '';
  brnNumber: string = '';
  msmeNumber: string = '';
  gstNumber: string = '';
  uNumber: string = '';

  // Flags
  isAnyPoliceCase: boolean = false;
  isAnyOtherRegistratoin: boolean = false;
  isConnectedCriminalCase: boolean = false;

  // Image
  imgPath: string = '';

  // Police cases
  getPoliceCaseList: PoliceCaseModel[] = [];
}

export class PoliceCaseModel {
  firNumber: string = '';
  policeStation: string = '';
  underSection: string = '';
  firDate: string = '';
  statusId: number = 0;
}

export class ViolationofActModel {
  Action: string = '';
  Compalaintno: string = '';

}

export class Web_TBL_RejoinderSearchModel {
  public ComplaintNumber: string = '';

}

