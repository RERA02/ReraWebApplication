import { ChangeDetectorRef, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SSOLandingDataDataModel, SSOLoginDataModel } from '../../Models/SSOLoginDataModel';
import { LoaderService } from '../../Services/Loader/loader.service';
import { SSOLoginService } from '../../Services/SSOLogin/ssologin.service';
import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumStatus, EnumRole } from '../../Common/GlobalConstants';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SSO_UserSearchModel, UserRequestModel } from '../../Models/UserRequestDataModel';
import { DropdownValidators } from '../../Services/CustomValidators/custom-validators.service';
import { AppsettingService } from '../../Common/appsetting.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  LoginType: any = "1";
  LoginRoleType: any;
  sSOLoginDataModel = new SSOLoginDataModel();
  _UserSearchModel = new SSO_UserSearchModel();
  sSOLandingDataDataModel = new SSOLandingDataDataModel();
  public State: number = -1;
  public Message: any = [];
  public ErrorMessage: any = [];
  public SSOjson: any = [];
  public DivisionMasterList: any = [];
  public DistrictMasterList: any = [];
  public TehsilMasterList: any = [];
  public DesignationMasterList: any = [];
  public InstituteList: any = []
  public UserName: string = '';
  public Password: string = '';
  isSubmitted: boolean = false;
  public isLoading: boolean = false;
  LoginForm!: FormGroup;
  public SSOToken: string = '';
  closeResult: string | undefined;
  modalReference: NgbModalRef | undefined;
  request = new UserRequestModel()
  UserRequestFormGroup!: FormGroup;
  isLoginSuccessful: boolean = true;
  public _EnumRole = EnumRole;
  constructor(private activatedRoute: ActivatedRoute, private sSOLoginService: SSOLoginService,
    private toastr: ToastrService, private loaderService: LoaderService, private router: ActivatedRoute,
    private routers: Router, private cdRef: ChangeDetectorRef, private commonMasterService: CommonFunctionService, private modalService: NgbModal,
    private cookieService: CookieService,
    private appsettingConfig: AppsettingService, private formBuilder: FormBuilder) { }

  init() {

    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.cdRef.detectChanges();
    });
  }
  public configUrl: any = "";
  get _UserRequestFormGroup() { return this.UserRequestFormGroup.controls; }

  async ngOnInit() {
    this.LoginForm = this.formBuilder.group(
      {
        txtUserID: ['', Validators.required],
        txtPassword: ['', Validators.required],
      })
    this.Logout();
    const element = document.getElementById('ddldepartmentSelect')
    if (element) element.focus();

    this.UserRequestFormGroup = this.formBuilder.group(
      {
        txtUserName: ['', Validators.required],
        txtUserEmail: ['', Validators.required],
        txtMobileNo: ['', Validators.required],
        ddlDesignation: ['', [DropdownValidators]],
        districtID: ['', Validators.required],
        divisionID: ['', Validators.required],
        //InstituteID: ['', [DropdownValidators]],
      });
  }
  get formLogin() { return this.LoginForm.controls; }

  @ViewChild('content') content: ElementRef | any;

  open(content: any, BookingId: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async Logout() {
    console.log("Logout...");
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('LoginID');
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.set('LoginStatus', "");
    this.cookieService.deleteAll();
    try {
      this.routers.navigate(['/login']);
      // await this.loaderService.requestStarted();
      //await this.menuService.SSOLogout(this.appsettingConfig.BacktoSSOURL_Logout?.toString());
    }
    catch (Ex) {
      console.log(Ex);

    }
    finally {
      await setTimeout(() => {
         this.loaderService.requestEnded();
      }, 200);
    }
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async UserRequest(content: any) {
    this.modalReference = this.modalService.open(content, { backdrop: 'static', size: 'sm', keyboard: true, centered: true });
  }

  async SaveData() {
    this.isSubmitted = true;
    this.request.SSOID = this.sSOLoginDataModel.SSOID;
    this.request.UserID = this.sSOLoginDataModel.UserID;
    if (this.UserRequestFormGroup.invalid) {
      return
    }

    //Show Loading
    this.loaderService.requestStarted();
    this.isLoading = true;
    try {
      await this.sSOLoginService.SaveData(this.request)
        .then((data: any) => {
          this.State = data['State'];
          this.Message = data['Message'];
          this.ErrorMessage = data['ErrorMessage'];
          if (this.State == EnumStatus.Success) {
            this.toastr.success(this.Message)
            this.ResetControl();
            /* this.OnReset()*/
          }
          else {
            this.toastr.error(this.ErrorMessage)
          }
        })
    }
    catch (ex) { console.log(ex) }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
        this.isLoading = false;

      }, 200);
    }
  }

  ResetControl() {
    this.isSubmitted = false;
    this.UserRequestFormGroup.reset();
  }

  CloseModalPopup() {
    this.modalService.dismissAll();
  }

  async Login() {
    this.isSubmitted = true;
    this.loaderService.requestStarted();
    try {
      this._UserSearchModel.SSOID = this.UserName;
      this._UserSearchModel.Password = this.Password;
     
      this.sSOLoginService.LoginWeb(this._UserSearchModel).subscribe({
        next: (data) => {
         
          data = JSON.parse(JSON.stringify(data.body)); 
          this.State = data['State'];
          this.Message = data['Message'];
          this.ErrorMessage = data['ErrorMessage'];

          if (this.State == EnumStatus.Success) {
            this.sSOLoginDataModel = data['Data'];
           /* console.log('First:', this.sSOLoginDataModel);*/
            localStorage.setItem('SSOLoginUser', JSON.stringify(this.sSOLoginDataModel));
            //const storedData = localStorage.getItem('SSOLoginUser');
            //const getlocalStorage = localStorage.getItem('authtoken');
            //console.log('second:', storedData);
            //console.log('Thrid:', getlocalStorage);
            setTimeout(() => {
                this.routers.navigate(['/ssologin'], {
                  queryParams: { id1: this.sSOLoginDataModel.SearchRecordID }
                });
            },100); 
          } else {
            this.toastr.error(this.Message);
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          // You can handle error state here, like showing a generic error message
          // this.toastr.error('An error occurred while logging in');
        }
      });
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


  GotoPassword() {
    if (this.UserName != '') {
      const txtPassword = document.getElementById('txtPassword')
      if (txtPassword) txtPassword.focus();
    }
  }
}

