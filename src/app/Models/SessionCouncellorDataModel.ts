export class CouncellorEventModel {
  public EventName: string = '';
  public sessionDate: string = ''; 
  public startTime: string = '';
  public endTime: string = '';
  public SessionId: number = 0; 
  public UserID: number = 0; 
  public RoleID: number = 0; 
  public SSOID: string = ''; 
  public Description: string = ''; 
  public types: string = ''; 
 
}
export class JobseekerSearchCouncellorDataModel {
  public CounselorName: string = '';
  public Location: string = '';
  public PrimaryDomainExpertiseID: number = 0;
  public FilterDate: string = '';
  public CounsellorID: number = 0;
  public JobSeekerUserID: number = 0;
  public ScheduleBookingID: number = 0;
  public ActionType: string = '';
}
export class CouncellorBookSlotWithJobseekerDataModel {
  public BookSessionId: number = 0; 
  public BookSessionDate: string = '';
  public SessionStartTime: string = '';
  public SessionEndTime: string = '';
  public SessionRemarks: string = '';
  public SessionLink: string = '';
  public SessionRejectRemarks: string = '';
  public SessionbookSelection: string = '';
  public JobseekerUserId: number = 0;
  public CounsellorUserId: number = 0;
  public CounsellorRoleID: number = 0;
  public ScheduleBookingID: number = 0;
  public CounsellorSsoid: string = '';
  public BookCalendartypes: string = '';
}
