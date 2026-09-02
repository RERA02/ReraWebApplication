export class WorkflowConfigurationEntity {
  public WorkflowId: number = 0;
  public ModuleId: number = 0;
  public SubModuleId: number = 0;
  public RoleLevelId: number = 0;
  public RoleId: number = 0; 
  public WorkflowLevelConfigListModel: WorkflowLevelConfigurationEntity[] = [];

  public ActionHeaderId: number = 0;
  public ActionId: number = 0;
  public ChildRoleLevelId: number = 0;
  public ChildRoleId: number = 0;
  public Priority: number = 0;
}

export class WorkflowLevelConfigurationEntity {
  public WorkflowLevelId: number = 0;
  public WorkflowId: number = 0;
  public ActionHeaderId: number = 0;
  public ActionId: number = 0;
  public ChildRoleLevelId: number = 0;
  public ChildRoleId: number = 0;
  public Priority: number = 0;

  public ActionType: string = "";
  public ActionName: string = "";
  public RoleLevelName: string = "";
  public RoleName: string = "";
}
