export class SSOLoginDataModel {

  public ProfileID: number = 0;
  public UserID: number = 0;
  public SSOID: string = '';
  public DistrictCode: string = '';
 public DisplayName: string = '';
  public AadhaarID: string = '';
    public DateofBirth: string = '';
  public Mobileno: string = '';
  public MailPersonal: string = '';
  public Designation: string = '';
  public DepartmentName: string = '';
  public EmployeeNumber: string = '';
  public DepartmentID: number = 0;
  public FirstName: string = '';
  public LastName: string = '';
  public JanaadhaarId: string = '';
  public ManaadhaarMemberId: string = '';
  public UserType: string = '';
  public RoleID: number = 0;
  public InstituteID: number = 0;
  public RoleName: string = '';
  public Eng_NonEng: number = 0;
  public Eng_NonEngName: string = '';
  public FinancialYearID: number = 0;
  public EndTermID: number = 0;
  public ExamScheme: number = 0;
  public Encrypted_SSOID: string = '';
  public SearchRecordID: string = '';
  public OfficeID: number = 0;
  public PPONumber: string = '';
  
  //Added on 08-10-2025
  public EmployeeType: string = '';
  public EmpTypeName: string = '';
  public DivIsPresentGovtEmploye: boolean = false;
  public DivIsPresentPrivateEmploye: boolean = false;
  public IsPresentGovtEmployee: boolean = false;
  public IsResidentState: boolean = false;

  public RegistrationNumber: string = '';
  public Contact_MobileNumber: string = '';
  public Head_Name: string = '';
  public SSOTOKEN: string = '';

  //public ApplicationID: number = 0;
  //public ApplicationFinalSubmit: number = 0;
  //public Bhamashahid: string = '';
  //public Bhamashahmemberid: string = '';
  public Gender: string = '';
  //public Telephonenumber: string = '';
  //public Ipphone: string = '';
  //public Postaladdress: string = '';
  //public Postalcode: string = '';
  //public City: string = '';
  //public State: string = '';
  //public Photo: string = '';
  //public Mailofficial: string = '';
  //public SldSSOIDs: any = '';
  //public Mfa: string = '';
  //public StudentID: number = 0;
  //public InstituteName: string = '';
  //public TermPart: number = 0;
  //public FinancialYearID_Session: number = 0;
  //public EndTermID_Session: number = 0;
  //public HostelID: number = 0;
  //public IsMutiHostelWarden: boolean = false;
  //public IsCitizenQueryUser: boolean = false;
  //public QueryType: number = 0;
  //public HostelIDs: string = '';
  //public SubjectCode: string = '';
  //public GuestRoomID: number = 0;
  //public StaffID: number = 0;
  //public MobileNo: number = 0;
  //public LevelID: number = 0;
  //public DivisionID: number = 0;
  //public ResidentStateID: number = 0;
  //public EmployeeTypeID: number = 0;
  //public PresentEmployeeID: number = 0;
}

export class SSOLandingDataDataModel {
  public Username: string = '';
  public LoginType: string = '';
  public Password: string = '';
 
}
export class UpdateStudentDetailsModel {
  public UserID: number = 0;
  public ProfileID: number = 0;
  public SSOID: string = '';
  public RoleID: number = 0;
}

export class ValidateUserRightsModel {
  public IsValidToken: boolean = false;
  public SSOID: string = '';
  public RoleID: number = 0;
  public SearchRecordID: string = '';
  public PageURL: string = '';
}


export class WebSite_ContactUsSave {
  public Id: number=0;
  public QueryType: number=0;
  public QueryText: string='';
   
  public FirstName: string = '';
  public LastName: string = '';
   
  public MobileNo: string = '';
  public EmailAddress: string = '';
   
  public Query: string = '';
  public QueryTypeName: string = '';
}





export class GetComplaintsAgainstRespondenSearch {
  public Action: string = '';
  public ComplaintNumber: string = '';

}

export class ComplaintResponseCreateModel {
  public Id: number = 0;
  public ComplaintNumberPartial: string = '';
  public FileTypeNew: string = '';
  public Comment: string = '';
  public RespondentMobileNo: string = '';
  public RespondentEmail: string = '';
  public otp: string = '';
  public complaintType: number = 0;
}
