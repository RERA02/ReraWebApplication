export class UserRequestModel {
  public AID: number = 0;
  public UserID: number = 0;  
  public SSOID: string = '';
  public Name: string = '';  
  public InstituteID: number = 0;  
  public Email: string = '';  
  public ActiveStatus: boolean = false;
  public DeleteStatus: boolean = false;
  public RTS: string = '';
  public CreatedBy: number = 0;
  public ModifyBy: number = 0;
  public ModifyDate: string = '';
  public IPAddress: string = '';
  public UserStatus: string = '';
  public RoleID: number = 0;

  public FirstName: string = '';
  public LastName: string = '';
  public JanaadhaarId: string = '';             
  public HandleUserId: number = 0;

  public MobileNo: string = '';
  public AadhaarID: string = '';

  public DepartmentId: number = 0;
  public LevelId: number = 0;
  public StateId: number = 0;
  public DivisionId: number = 0;
  public DistrictId: number = 0;
  public OfficeId: number = 0;
  public DesignationId: number = 0;

  public ReturnUserId: number = 0;
}
export class UserSearchModel {
  public UserStatus: string = '';
}

export class UserRequestListModel {
  public RowNo: number = 0;
  public UserID: number = 0;
  public LevelName: string = '';
  public DesignationName: string = '';
  public Email: string = '';
  public MobileNo: string = '';
  public CreatedDate: string = '';
}


export class SSO_UserSearchModel {
  public SSOID: string = '';
  public Password: string = '';


}

