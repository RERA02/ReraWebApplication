import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SSOLandingDataDataModel, SSOLoginDataModel, UpdateStudentDetailsModel } from '../../Models/SSOLoginDataModel';
import { LoaderService } from '../../Services/Loader/loader.service';
import { SSOLoginService } from '../../Services/SSOLogin/ssologin.service';
import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';
import { EnumRole, EnumStatus, EnumUserType, GlobalConstants } from '../../Common/GlobalConstants';
import { AppsettingService } from '../../Common/appsetting.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { UserRequestService } from '../../Services/UserRequest/user-request.service';
import { SweetAlert2 } from '../../Common/SweetAlert2';
import { UserRequestListModel } from '../../Models/UserRequestDataModel';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-ssologin',
  templateUrl: './ssologin.component.html',
  styleUrls: ['./ssologin.component.css'],
  standalone: false
})

export class SSOLoginComponent implements OnInit, AfterViewInit {
  LoginType: any = "1";
  Username: any;
  LoginRoleType: any;
  sSOLoginDataModel = new SSOLoginDataModel();
  sSOLandingDataDataModel = new SSOLandingDataDataModel();
  requestUpdateUserType = new UpdateStudentDetailsModel();
  public userDetails: any;
  public State: number = -1;
  public Message: any = [];
  public ErrorMessage: any = [];
  public SSOjson: any = [];
  //Modal Boostrap
  //Modal Boostrap
  closeResult: string | undefined;
  modalReference: NgbModalRef | undefined;

  @ViewChild('modal_UserLoginType') modal_GenrateOTP: any;



  constructor(private activatedRoute: ActivatedRoute, private sSOLoginService: SSOLoginService, private toastr: ToastrService, private loaderService: LoaderService, private router: ActivatedRoute, private routers: Router, private cdRef: ChangeDetectorRef, private commonMasterService: CommonFunctionService, private cookieService: CookieService, private appsettingConfig: AppsettingService, private modalService: NgbModal, private Swal2: SweetAlert2) {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('LoginID');
    sessionStorage.clear();
    localStorage.clear();
  }
  ngAfterViewInit() {

  }

  init() {
    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.cdRef.detectChanges();
    });
  }

  public configUrl: any = "";
  async ngOnInit() {
    console.log('SSOLoginComponent');
    console.log("AppName", this.appsettingConfig.AppName);
    this.loaderService.requestStarted();
    if (this.cookieService.get(this.appsettingConfig.AppName) != null && this.cookieService.get(this.appsettingConfig.AppName) != '') {
      this.Username = this.cookieService.get(this.appsettingConfig.AppName);
      this.cookieService.delete(this.appsettingConfig.AppName)
    }
    else {
      this.Username = this.router.snapshot.paramMap.get('id1')?.toString();
      if (this.Username == undefined) {
        this.Username = this.router.snapshot.queryParams['id1'];
      }
    }
    console.log("Username", this.Username);
    await this.Citizenlogin(this.Username);

    setTimeout(() => {

      this.loaderService.requestEnded();
    }, 200);

  }



  async Citizenlogin(Loginssoid: string) {
    
    try {
      this.sSOLandingDataDataModel.Username = Loginssoid;
      this.sSOLandingDataDataModel.LoginType = '-999';
      this.sSOLandingDataDataModel.Password = Loginssoid;
      console.log("Loginssoid", Loginssoid);

      if (Loginssoid == undefined || Loginssoid == '' || Loginssoid == 'NaN' || Loginssoid.toString() == NaN.toString()) {
        window.open(this.appsettingConfig.SSOURL, "_self");
        return;
      }
      console.log("Loginssoid2", Loginssoid);
      await this.sSOLoginService.GetSSOUserDetails(Loginssoid)
        .then(async (res: any) => {

          console.log("authtoken", res.headers.get('x-authtoken'));
          localStorage.setItem('authtoken', res.headers.get('x-authtoken'));
          var data = JSON.parse(JSON.stringify(res.body));
          this.State = data['State'];
          this.Message = data['Message'];
          this.ErrorMessage = data['ErrorMessage'];

          if (this.State == EnumStatus.Success) {
            this.sSOLoginDataModel = await data['Data'];
            //console.log('Check this SSOID SSOModel', this.sSOLoginDataModel);
            localStorage.setItem('SSOLoginUser', JSON.stringify(this.sSOLoginDataModel))
            //sessionStorage.setItem('SSOLoginUser', JSON.stringify(this.sSOLoginDataModel));
            //// and later
            //const storedUser = sessionStorage.getItem('SSOLoginUser');
            //this.sSOLoginDataModel = storedUser ? JSON.parse(storedUser) : null;

            if ((this.sSOLoginDataModel.RoleID == 0 || this.sSOLoginDataModel.RoleID == null) && (this.sSOLoginDataModel.UserID == 0 || this.sSOLoginDataModel.UserID == null)) {
              if (this.sSOLoginDataModel.UserType.toLowerCase() == "govt" || this.sSOLoginDataModel.UserType == '' || this.sSOLoginDataModel.UserType == null) {
                this.routers.navigate(['/UserRequestForm']);
              }
              else {
                this.routers.navigate(['/EEMSLanding']);
              }
            }
            

            /* this.routers.navigate(['/dashboard/counsellor']);*/

            else {
              if (this.sSOLoginDataModel.RoleID == EnumRole.SUPERADMIN) {
                this.routers.navigate(['/dashboard/admin']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.DealingAssistant) {
                this.routers.navigate(['/dashboard/dealingassistant']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.DEO) {
                this.routers.navigate(['/dashboard/deo']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.STATENODAL) {
                this.routers.navigate(['/dashboard/statenodal']);
              }
              // else if (this.sSOLoginDataModel.RoleID == EnumRole.EMPLOYER) {

              ///*   this.routers.navigate(['/dashboard/employer']);*/
              // }

              else if (this.sSOLoginDataModel.RoleID === EnumRole.EMPLOYER) {

                //const userId = this.sSOLoginDataModel.UserID;
                //const ActionName = 'GetEmployerDetails';

                try {
                  //console.log('On Employer Role', "Before GetUserDetail");
                  //console.log('On Employer Role userId=', userId);
                  //const response: any = await this.sSOLoginService.GetUserDetail(userId, ActionName);
                  //console.log('On Employer Role', "After GetUserDetail");


                  //if (response.body.Data.length > 0) {
                  //  this.userDetails = response.body.Data[0];


                  //  this.sSOLoginDataModel.RegistrationNumber = this.userDetails.RegistrationNumber || '';
                  //  this.sSOLoginDataModel.Contact_MobileNumber = this.userDetails.Contact_MobileNumber || '';
                  //  this.sSOLoginDataModel.Head_Name = this.userDetails.Applicant_Name || '';

                  //this.routers.navigate(['/dashboard/employer']);// Uncomment this
                  this.routers.navigate(['/JobFair/JobFairDashboard']);// comment this

                  //}
                  //else {
                  //  console.error('No user details returned from API.');
                  //  this.toastr.error('User details not found.');
                  //}

                } catch (error) {
                  console.error('Error fetching user details:', error);
                  this.toastr.error('Failed to load user details.');
                }
              }


              else if (this.sSOLoginDataModel.RoleID == EnumRole.JOBSEEKER) {
                const userId = this.sSOLoginDataModel.UserID;
                const ActionName = 'GetJobseekerDetails';

                try {
                  const response: any = await this.sSOLoginService.GetUserDetail(userId, ActionName);



                  if (response.body.Data.length > 0) {
                    this.userDetails = response.body.Data[0];


                    this.sSOLoginDataModel.RegistrationNumber = this.userDetails.RegistrationNumber || '';
                    this.sSOLoginDataModel.Contact_MobileNumber = this.userDetails.Contact_MobileNumber || '';
                    this.sSOLoginDataModel.Head_Name = this.userDetails.Applicant_Name || '';



                    //localStorage.setItem('SSOLoginUser', JSON.stringify(this.sSOLoginDataModel));
                    //this.routers.navigate(['/dashboard/jobseeker'],

                    //  {

                    //  });
                    //this.routers.navigate(['/dashboard/jobseeker']);
                    this.routers.navigate(['/JobFair/JobFairDashboard']);
                    

                    //this.routers.navigate(['/LoginOtpvalidation'], {
                    //  //queryParams: {
                    //  //  Head_Name: this.sSOLoginDataModel.Head_Name,
                    //  //  Contact_MobileNumber: this.sSOLoginDataModel.Contact_MobileNumber,
                    //  //  RegistrationNumber: this.sSOLoginDataModel.RegistrationNumber
                    //  //}
                    //});
                  } else {
                    console.error('No user details returned from API.');
                    this.toastr.error('User details not found.');
                  }

                } catch (error) {
                  console.error('Error fetching user details:', error);
                  this.toastr.error('Failed to load user details.');
                }
              }


              /* this.routers.navigate(['/dashboard/jobseeker']);*/

              else if (this.sSOLoginDataModel.RoleID == EnumRole.KIOSK) {
                this.routers.navigate(['/emitradashboard']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.DepartmentHO) {
                this.routers.navigate(['/dashboard-department-ho']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.Developer) {
                this.routers.navigate(['/developer-dashboard']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.Counsellor) {
                //this.routers.navigate(['/dashboard/counsellor']);
                this.routers.navigate(['/dashboard/counselordashboard']);
              }
              else if (this.sSOLoginDataModel.RoleID == EnumRole.DealingAssistantState) {
                //this.routers.navigate(['/dashboard/counsellor']);
                this.routers.navigate(['/JobFair/JobFairEventDayForAttendance']);
              }
              else {
                if (this.sSOLoginDataModel.UserType.toLowerCase() == "govt") {
                  this.routers.navigate(['/UserRequestForm']);
                }
                else {
                  this.routers.navigate(['/EEMSLanding']);
                }
              }
            }
          }
        }, error => console.error(error));

      if (this.sSOLoginDataModel.SSOID == '') {
        window.open(this.appsettingConfig.SSOURL, "_self");
        return;
      }
    }
    catch (Ex) {
      console.log(Ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }
}
