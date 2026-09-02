import { RequestBaseModel } from "./RequestBaseModel";

export interface IDistrictMaster_StateIDWiseDataModel {
  DistrictID: number;
  DistrictName: string
}

export interface IStateMasterDataModel {
  StateID: number;
  StateName: string
}

export class ItiTradeSearchModel {
  public CollegeID: number = 0
  public action: string = ''
  public TradeLevel: number = 0
  public IsPH: number = 0
  public CourseTypeID?: number = 0
  public TradeTypeId?: number = 0
}

export class ItiCollegesSearchModel {
  public DistrictID: number = 0
  public action: string = ''
  public ManagementType: string = ''
  public ManagementTypeID?: number | undefined = 0;
}

export class UpwardMoment {
  public ApplicationID: number = 0
  public AllotmentId: number = 0
  public IsUpward: boolean = false
  public UserID: number = 0
}

export class ItiStuAppSearchModelUpward {
  public ApplicationNo: string = ''
  public action: string = ''
  public FinancialYearID: number = 0
  public SSOID: string = ''
  public DOB: string = ''
  public MobileNumber: string = ''
  public EndTermID: number = 0
  public DepartmentID: number = 0

}

export class TSPTehsilDataModel {
  public DistrictID: number = 0
}

export class StreamDDL_InstituteWiseModel {
  public InstituteID: number = 0
  public ApplicationID: number = 0
  public StreamType:number=0
  public action: string = ''

}

export class QualificationDDLDataModel {
  public QualificationLevel: string = ''
  public DepartmentID: number = 0

}

export class DDL_InvigilatorSSOID_DataModel extends RequestBaseModel {
  public InstituteID: number = 0
}

export class DocumentDetailsModel {
  public SchemeID: number = 0;
  public DocumentMasterId: number = 0;
  public DocumentMasterEn: string = '';
  public DocumentMasterHi: string = '';
  public DocumentMasterCode: string = '';
  public IsMandatory: number = 0;
  public ShortName: string = '';
  public FileName: string = '';
  public Dis_FileName: string = '';
}

export class SchemeChecklistModel {
  public SchemeId: number = 0;
  public ChecklistTextEn: string = '';
  public ChecklistTextHi: string = '';
  public ClassName: string = '';
}
export class JanaadhaarDetailsModel {
  public EnrId: string = '';
  public JanAadhaarNo: string = '';
  public JanMemberId: string = '';
  public AadharNo: string = '';
}


export class UserRequestApprovalModel {
  public RequestType: string = '';
  public RoleId: number = 0;
  public Remarks: string = '';
  public SSOId: string = '';
  public UserId: number = 0;
}

export class ApplyForNotifications {
  CreatedBy: Number = 0;
  NotificationList: NotificationList[] = [];
}
export class NotificationList {  
  NotificationId: Number = 0;
  JobPostId: Number = 0;
}
export class CommonDetails {  
  public Id: Number = 0;
  public isProfileOrProject: Number = 0;
  public Action: string = '';
  public Type: string = '';
  public pnrno: string = '';
}
export class AgentDocument {  
  public UserId: Number = 0;
  public ProfileType: string = ''; 

}






