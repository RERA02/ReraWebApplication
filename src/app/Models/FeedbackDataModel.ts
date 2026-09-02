export class GrievanceDataModel {
  public GrievanceID: number = 0;
  public ComplainNo: string = '';
  public CategoryID: number = 0;
  public DepartmentID: number = 0;
  public ModuleID: number = 0;
  public ApplicationNo: string = '';
  public SubjectRelatedToComplain: string = '';
  public FileAttachment: string = '';
  public DisAttachmentFileName: string = '';
  public Remark: string = '';
  public StatusID: number = 0;
  public ResolvedDate: string | null = null;  // Null by default
  public ActiveStatus: boolean = true;
  public DeleteStatus: boolean = false;
  public ModifyBy: number = 0;  // Default value of 0
  public CreatedBy: number = 0;  // Default value of 0
  public RoleID: number = 0;
}
export interface Grievance {
  GrievanceID: number;
  ComplainNo: string;
  Subject: string;
  CategoryID: number;
  CategoryType: number;
  ModuleID: number;
  SubModuleID: number;
  Remark: string;
  CreatedDate: string;
  DisAttachmentFileName: string;
  FileAttachment: string;
}



export class FeedbackModelsDataModel {
  FeedbackID!: number;
  DepartmentID!: number;
  ModuleID!: number;
  JobSeekerID!: number;
  SchemeID!: number;
  SubModuleID!: number;
  Subject?: string;
  AttachmentFileName?: string;
  StatusID!: number;
  RequestStatus!: number;
  IsActive!: boolean;
  IsDeleted!: boolean;
  UpdatedBy!: number;
  CreatedBy!: number;
  IPAddress?: string;
  RoleID!: number;
  UserID!: number;
  selectedRating!: number;
  RemarkFeedback?: string;
  ReopenGrievance!: number;
  ReopenGrievanceDate!: Date;
  ResolvedDate!: Date;
  NextRoleID?: string;
  GrievanceID!: number;
  JobSeekerUserID!: number;
  CounsellorUserID!: number;
}

export class FeedbackGetDataModel {

  public GrievanceID: number = 0;
  public FeedbackID?: number;         
  public selectedRating?: number;     
  public RemarkFeedback?: string;             
 

}













