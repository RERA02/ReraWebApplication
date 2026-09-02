import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { EnumStatus, GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel, WebSite_ContactUsSave } from '../../../Models/SSOLoginDataModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  standalone: false,
})

export class contactusComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
  public sSOLoginDataModel = new SSOLoginDataModel();
  public ContactModel = new WebSite_ContactUsSave();
  public State: number = 0;
  public Message: any = [];
  public ErrorMessage: any = [];
  public ContactFormGroup!: FormGroup;
  queryTypes = [
    { id: 1, name: 'Project Registration' },
    { id: 3, name: 'Agent Registration' },
    { id: 4, name: 'Other' }
  ];


  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal,
    private fb: FormBuilder,
  ) {

  }

  async ngOnInit() {
    console.log('Home');
    this.sSOLoginDataModel.DepartmentID = 1;


    sessionStorage.clear();
    localStorage.clear();
    this.ContactFormGroup = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      MobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      QueryType: ['', Validators.required],
      Query: ['', Validators.required]
    });
    //this.ContactFormGroup = this.fb.group({
    //  QueryType: [0],
    //  FirstName: [''],
    //  LastName: [''],
    //  EmailAddress: [''],
    //  MobileNo: [''],
    //  Query: ['']
    //});


  }



  get form() { return this.ContactFormGroup.controls; }


  async SaveData() {
    debugger;

    // If form invalid
    if (this.ContactFormGroup.invalid) {

      // Mark all fields as touched (to show validation messages)
      Object.keys(this.ContactFormGroup.controls).forEach(key => {
        this.ContactFormGroup.controls[key].markAsTouched();
      });

      // Focus first invalid field
      this.focusFirstInvalidField();

      this.toastr.error('Please fill all required fields');
      return;
    }

    // Use reactive form value (BEST PRACTICE)
    const payload = this.ContactFormGroup.value;
/*    const payload = new WebSite_ContactUsSave();*/

    // Set ALL values static
    //payload.Id = 1;
    //payload.QueryType = 2;
    //payload.QueryText = 'Static Query Text';

    //payload.FirstName = 'Shyam';
    //payload.LastName = 'Sharma';

    //payload.MobileNo = '9999999999';
    //payload.EmailAddress = 'Shyam@gmail.com';

    //payload.Query = 'This is static query message';
    //payload.QueryTypeName = 'General Inquiry';
    try {
      const data: any = await this.homeService.SendQueryToAdminWebSite(payload);

      this.State = data.data;
      this.Message = data.message;
      this.ErrorMessage = data.ErrorMessage;
      debugger
      if (this.State === 1) {

        this.toastr.success(this.Message);

        // Reset form properly
        this.ContactFormGroup.reset();
        this.ContactFormGroup.patchValue({ QueryType: '' });

      } else {
        this.toastr.error(this.ErrorMessage);
      }

    } catch (error) {
      this.toastr.error('Something went wrong');
    }
  }

  focusFirstInvalidField() {

    const firstInvalidControl: HTMLElement | null =
      document.querySelector('form .ng-invalid');

    if (firstInvalidControl) {
      firstInvalidControl.focus();
    }
  }
  //async SaveData() {
  //  debugger

  //  if (this.ContactFormGroup.invalid) {
  //    this.toastr.error('Please fill all required fields');
  //    return;
  //  }
  //  console.log(this.ContactFormGroup.value);     // reactive
  //  console.log(this.ContactModel);
    
  //  /*const payload = this.ContactFormGroup.value;*/

  //  try {
  //    const data: any = await this.homeService.ContactUs(this.ContactModel);

  //    this.State = data.State;
  //    this.Message = data.Message;
  //    this.ErrorMessage = data.ErrorMessage;

  //    if (this.State == EnumStatus.Success) {
  //      this.toastr.success('Save Sucessfully');
  //      this.ContactFormGroup.reset({ QueryType: 0 });
  //    } else {
  //      this.toastr.error(this.ErrorMessage);
  //    }

  //  } catch (error) {
  //    this.toastr.error('Something went wrong');
  //  }
  //}


}
