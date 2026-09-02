import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { GetUploadedDocumentsSPModel, ViolationofActModel } from '../../../Models/Master';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-home',
  templateUrl: './ComplaintBox.component.html',
  styleUrls: ['./ComplaintBox.component.css'],
    standalone: false
})


export class ComplaintBoxComponent implements OnInit {
  complaintForm!: FormGroup;
  selectedFile: File | null = null;
  successMessage = '';
  constructor(
    private router: Router, private fb: FormBuilder, private toastr: ToastrService, 
    private commonMasterService: CommonFunctionService, private loaderService: LoaderService, private routers: Router, private HomeService: HomeService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.complaintForm = this.fb.group({

      IsIdentityDisclosed: [null, Validators.required],

      ComplainantName: ['', Validators.required],

      ComplainantEmail: ['', [
        Validators.email   // MVC me EmailAddress hai (required nahi)
      ]],

      ComplainantMobile: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]],

      ComplainantAddress: ['', Validators.required],

      ProjectName: ['', Validators.required],
      DistrictName: ['', Validators.required],
      ProjectAddress: ['', Validators.required],
      Location: ['', Validators.required],

      ComplaintDescription: [''],

      PromoterName: ['', Validators.required],

      PromoterContactNumber: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]],

      PromoterAddress: ['', Validators.required]
    });

  }



  onIdentityChange(value: boolean) {
    if (value === true) {
      window.location.href = "https://sso.rajasthan.gov.in/signin";
    }
  }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }




  


  //async onSubmit() {

  //    if (this.complaintForm.invalid) {
  //      this.complaintForm.markAllAsTouched();
  //      return;
  //    }

  //  const staticData = {
  //    IsIdentityDisclosed: true,
  //    ComplainantName: 'RAJEEV ANKIT',
  //    ComplainantEmail: 'DEEPAK@gmail.com',
  //    ComplainantMobile: '9461569464',
  //    ComplainantAddress: 'Jaipur Rajasthan',
  //    ProjectName: 'DWARKA THE MORDEN TOWN',
  //    DistrictName: 'Jaipur',
  //    ProjectAddress: '373 NEMI NAGAR EXT NEAR VAISHALI NAGAR',
  //    Location: 'Jaipur',
  //    ComplaintDescription: 'KINDLY REFER TO THE DETAILED COMPLAINT FOR THE GROUNDS OF RELIEF AND LEGAL PROVISIONS.',
  //    PromoterName: 'DWARKA THE MORDEN TOWN',
  //    PromoterContactNumber: '9587889654',
  //    PromoterAddress: '373 NEMI NAGAR EXT NEAR VAISHALI NAGAR'
  //  };

  //  try {

  //    const res: any = await this.HomeService.SaveComplaintBoxWebSites(staticData);

  //    this.successMessage = "Saved Successfully";

  //    this.complaintForm.reset();

  //  } catch (error) {
  //    console.error(error);
  //  }

  //}

  async onSubmit() {

    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    Object.keys(this.complaintForm.value).forEach(key => {
      formData.append(key, this.complaintForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    try {

      let res: any = await this.HomeService.SaveComplaintBoxWebSite(formData);

      if (res.success) {
        //alert(res.message);
        this.successMessage = res.message;
        this.complaintForm.reset();
      } else {
        /*alert(res.message);*/
        this.successMessage = res.message;
      }

    } catch (error) {
      //alert("Server error occurred");
      this.successMessage = 'Server error occurred';
    }
  }

 



}
