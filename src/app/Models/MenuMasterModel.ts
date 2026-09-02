export class MenuMasterDataModel {
  public MenuId: number = 0;
  public ParentId: number = 0;
  public MenuNameEn: string = '';
  public MenuIdentifier: string = '';
  public MenuNameHi: string = '';
  public MenuUrl?: string = '';
  public MenuIcon: string = '';
  public SortOrder: number = 1;
  public Priority?: number = 1;
  public Remark: string = '';
  public IsActive: boolean = true;
  public IsDeleted: boolean = false;
  public CreatedBy: number = 1;
  public ModifyBy: number = 1;
  public Marked?: boolean = false
  public DepartmentID: number = 0;
}

export class MenuMasterSerchModel {
  public MenuId: number = 0;
  public MenuNameEn: string = '';
  public DepartmentID: number = 0;

}



