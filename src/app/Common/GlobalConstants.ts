import { EnumApplicationStatus } from "./enum-noc";

export class GlobalConstants {

  //api uploaded folder path in static folder
  public static LogFolder: string = "Log";
  public static PlacementCompanyFolder: string = "PlacementCompany";
  public static StudentsFolder: string = "Students";
  public static StaffMemberFolder: string = "Staff";
  public static ReportsFolder: string = "Reports";
  public static AllotmentReceipt: string = "Reports/AllotmentReciept";
  // regex
  public static AadhaarPattern: RegExp = /^[2-9]{1}[0-9]{11}$/;  // Aadhaar must start with 2-9 and be 12 digits long
  public static IFSCPattern: RegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  public static AccountNoPattern: RegExp = /^[0-9]{9,18}$/;
  public static PositionPattern: RegExp = /^[1-9]$/;
  public static MobileNumberPattern: RegExp = /^[6-9]\d{9}$/;
  public static EmailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public static SSOIDPattern: RegExp = /^[a-zA-Z0-9._]+[a-zA-Z0-9]$/
  public static NameNoNumbersPattern: RegExp = /^[^\d]*$/;
  public static AllowNumbersPattern: RegExp = /^[0-9]+(\.[0-9]+)?$/;
  public static PincodePattern: RegExp = /^[0-9]{6}$/;
  // other
  public static DefaultOTP: string = "123456";
  public static DefaultTimerOTP: number = 1;
  //message
  public static MSG_ERROR_OCCURRED: string = "Error occurred!";

  public static ServerNotBlockedURL: string[] = [
    "/assets/appsettings.json",//not server side
    "http://localhost:4200/api/SSO/GetUserRoleList/vijaykanugo.risl/1/true/2",
    "http://localhost:4200/api/SSO/GetAcedmicYearList/2/1",
    "http://localhost:4200/api/MenuMaster/MenuUserandRoleWise/",
  ];

}

// enums
export enum EnumStatus {
  Success = 1,
  Error = 2,
  Warning = 3
}

export enum EnumUserType {
  CITIZEN = "CITIZEN",
  GOVT = "GOVT",
  KIOSK = "KIOSK",
  STUDENT = "STUDENT"
}

export enum EnumRole {
  SUPERADMIN = 1,
  CITIZEN = 2,
  KIOSK = 3,
  JOBSEEKER = 4,
  STATENODAL = 5,
  DEO = 6,
  EMPLOYER = 7,
  Counsellor = 8,
  DealingAssistant = 9,
  DepartmentHead = 10,
  DepartmentHO = 11,
  DepartmentHOClerk = 12,
  Developer = 13,
  DealingAssistantState = 21,

}
export enum EnumSsoid {
  SSOID = "Counsellor"
}



export enum EnumDepartment {
  BTER = 1,
  ITI = 2,
  DCE = 3
}


export enum AssessmentType {
  Self = 1,
  Psychometric = 2
}
