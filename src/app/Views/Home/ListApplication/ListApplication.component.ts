import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../Services/Home/home.service';
import { GlobalConstants } from '../../../Common/GlobalConstants';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';


@Component({
  selector: 'app-ListApplication',
  templateUrl: './ListApplication.component.html',
  styleUrls: ['./ListApplication.component.css'],
    standalone: false
})

export class ListApplicationComponent implements OnInit {
  public _GlobalConstants: any = GlobalConstants;
  public PostId: number = 0;
  public CampusPostList: any[] = [];
  public PlacementCompanyList: any[] = [];
  public docUrl: string = '';
  public sSOLoginDataModel = new SSOLoginDataModel();
  public formsList: any[] = [
    { name: 'Form R-5', path: 'assets/pdfs/Form R-5.pdf' },
    { name: 'Form G as amended by notification dated 23.08.2022 by UDH Department', path: 'assets/pdfs/43158522Amended FORM G.pdf' },
    { name: 'Checklist for Project Registration as per order dated 27.08.2021', path: 'assets/pdfs/3989Checklist order 2708.pdf' },
    { name: 'APPLICATION FOR REGISTRATION OF PROJECT - FORM A', path: 'assets/pdfs/5778Form A Revised.pdf' },
    { name: 'DECLARATION - FORM B', path: 'assets/pdfs/FORMB.pdf' },
    { name: 'REGISTRATION CERTIFICATE OF PROJECT - FORM C', path: 'assets/pdfs/FORMC.pdf' },
    { name: 'INTIMATION OF REJECTION OF APPLICATION FOR REGISTRATION OF PROJECT / REJECTION OF APPLICATION FOR EXTENSION OF REGISTRATION OF PROJECT / REVOCATION OF REGISTRATION OF PROJECT - FORM D', path: 'assets/pdfs/FORMD.pdf' },
    { name: 'CERTIFICATE FOR EXTENSION OF REGISTRATION OF PROJECT - FORM F', path: 'assets/pdfs/FORMF.pdf' },
    { name: 'Agreement for Sale - FORM G', path: 'assets/pdfs/FORMG.pdf' },
    { name: 'APPLICATION FOR REGISTRATION OF REALESTATE AGENT - FORM H', path: 'assets/pdfs/FORMH.pdf' }
  ];

  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
    console.log('Home');
    
    this.sSOLoginDataModel.DepartmentID = 1;
    this.docUrl = this.commonMasterService.DocUrl;
    sessionStorage.clear();
    localStorage.clear();
    console.log('formsList',this.formsList);
  }

  // get all data
  

}
