/*import { Component } from '@angular/core';*/
//import { Component, OnInit, TemplateRef, ViewChild, Renderer2, ElementRef, Inject, PLATFORM_ID, signal, inject } from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
//import { Router } from '@angular/router';
//import { EnumDepartment, EnumRole, GlobalConstants } from '../../Common/GlobalConstants';
//import { DOCUMENT, isPlatformBrowser, PlatformLocation } from '@angular/common';
//import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
//import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { CookieService } from 'ngx-cookie-service';
//import { HttpClient } from '@angular/common/http';
//import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
//import { map, Subscription } from 'rxjs';
//import { LoaderService } from '../../Services/Loader/loader.service';
//import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';



import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
declare var window: any;

@Component({
  selector: 'app-sso-landing',
  standalone: false,
  templateUrl: './sso-landing.component.html',
  styleUrl: './sso-landing.component.css'
})
export class SsoLandingComponent implements OnInit {
 
  sSOLoginDataModel = new SSOLoginDataModel();
  UserName: any = '';
  public MultiHostelWardenRoleList: any = [];

  constructor(private router: Router, private loaderService: LoaderService) {
  
  }


  async ngOnInit() {

    this.sSOLoginDataModel = await JSON.parse(String(localStorage.getItem('SSOLoginUser')));
  }

  async GetUserRedirectToOTR() {
    this.router.navigate(['/OTRForm']);
  }

  async loadMenuByRoleID(SeletedUserId: any) {
   
  }

}
