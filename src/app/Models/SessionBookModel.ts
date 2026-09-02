export class SessionModel {
  public ScheduleBookingID: number=0;
  public CounsellorID: number=0;
  public JobseekerSSOID: string='';
  public CounsellorSSOID: string='';
  public JobseekerRoleID: number=0;
  public CounsellorRoleID: number=0;
  public JobSeekerUserID: number=0;
  public JobseekerUserType: string ='';
  public CounsellorUserType: string ='';
  public RequestActionType: string = '';
  public CounsellorActionType: string = '';
  public JobSeekerRemarks: string = '';
  public CounsellorRemarks: string = ''; 
  public CounsellorUserID: number = 0;
  public ScheduleDate: string = '';
  public ScheduleMeetingTimeIn: string = '';
  public ScheduleMeetingTimeOut: string = '';
  public Link: string = '';
  public Description: string = '';
  public JobseekerName: string = '';
  public MobileNumber: string = '';
  public Email: string = '';
  public CancelRequestByJobSeekerRemarks: string = '';
  public CancelRequestByJobSeekerActionType: string = '';
  public AcceptByJobSeekerActionType: string = '';
  public AcceptRequestByJobSeekerRemarks: string = '';
}
