export class VerifierDataModel {
    public VerifierID: number = 0
    public Name: string = ''
    public SSOID: string = ''
    public Email: string = ''
    public MobileNumber: string = ''
    public Remark: string = ''

    public ActiveStatus: boolean = true
    public DeleteStatus: boolean = false
    public ModifyBy: number = 0
    public CreatedBy: number = 0
  public DepartmentID: number = 0
  public RoleID: number = 0
  public CourseType: number = 0
  public ShowAllApplication: boolean = false;

}

export class VerifierSearchModel {
    public SSOID: string = ''
    public Name: string = ''
  public MobileNo: string = ''
  public DepartmentID: number = 0
    public CourseType:number=0
}
