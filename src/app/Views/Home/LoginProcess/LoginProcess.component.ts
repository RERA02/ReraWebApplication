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
  selector: 'app-LoginProcess',
  templateUrl: './LoginProcess.component.html',
  styleUrls: ['./LoginProcess.component.css'],
    standalone: false
})

export class LoginProcessComponent implements OnInit {
  columns: string[] = [];
  rows: any[] = [];

  query: string = '';

  searchText = '';


  storedProcedures: string[] = [];

  
  constructor(private commonMasterService: CommonFunctionService, private homeService: HomeService, private toastr: ToastrService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {

  }

  async ngOnInit() {
   // console.log('Home');
    //this.sSOLoginDataModel.DepartmentID = 1;
    //await this.GetAllPost();
   // sessionStorage.clear();
   // localStorage.clear();
    
  }
  //executeQuery() {

  //  if (!this.query) {
  //    alert('Please enter');
  //    return;
  //  }

  //  this.homeService.executeQuery(this.query)
  //    .subscribe({
  //      next: (res: any) => {
  //        debugger;
  //        this.columns = res.Columns;
  //        this.rows = res.Rows;

  //      },
  //      error: (err) => {

  //        console.log(err);
  //        alert('Query execution failed');

  //      }
  //    });
  //}
  executeQuery() {

    if (!this.query?.trim()) {
      return;
    }

    this.homeService.executeQuery(this.query)
      .subscribe((res: any) => {

        this.columns = res.Columns;
        this.rows = res.Rows;

      });
  }

  clear() {

    this.query = '';
    this.columns = [];
    this.rows = [];

  }

  searchSP() {

    if (this.searchText.length < 2)
      return;

    this.homeService.searchSP(this.searchText)
      .subscribe((res: any) => {

        this.storedProcedures = res;

      });
  }

  loadSP(spName: string) {

    this.homeService.getSPDefinition(spName)
      .subscribe((res: any) => {

        this.query = res.Definition;

      });
  }
  // get all data
 
}
