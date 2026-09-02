import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { CommonModule, DOCUMENT, PlatformLocation } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { HttpClient } from '@angular/common/http';
import { AppsettingService } from '../../../Common/appsetting.service';

import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { HomeService } from '../../../Services/Home/home.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  standalone: false
})
export class HomeLayoutComponent {
  increaseCount = 0;
  decreaseCount = 0;

  
  maxClicks = 2;
  public language: string = ''
  public langType: string = 'hi'
  public LT: number = 0
  sSOLoginDataModel = new SSOLoginDataModel();
  private ssoLoginUserPollingInterval: any;
  private previousSSOUser: string | null = null;
  fontSize: number = 14; 
  fontSizeTitle: number = 34; 
  tagsHedingLarge: number = 74;
  IsLogin: boolean = false;
  isMegaOpen = false;
  activeIndex: number | null = null;
  public Actionkey: string = '';
  public GetVisitorCountValue: number = 0;
  public docUrl: string = '';
  activeMenu: string | null = null;
  activeMenuId: string | null = null;
  public PatchDate: string = '';
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private breakpointObserver: BreakpointObserver, private el: ElementRef, private loaderService: LoaderService,
    private sanitizer: DomSanitizer, location: PlatformLocation, private modalService: NgbModal, private commonFunctionService: CommonFunctionService,
    private http: HttpClient, public appsettingConfig: AppsettingService, public homeService: HomeService,
    
    private renderer: Renderer2) {
    
  }

   ngOnInit(): void {
     this.GetVisitorCount();
     this.GetPatchDate();
     this.AddVisitorCount();
     this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe(() => {
         this.setActiveMenuByRoute();
       });

     this.docUrl = this.commonFunctionService.DocUrl;
    this.ssoLoginUserPollingInterval = setInterval(() => {
      const currentUser = localStorage.getItem('SSOLoginUser');
      if (currentUser) {
        this.IsLogin = true;
      }
      if (this.previousSSOUser !== currentUser) {
        this.previousSSOUser = currentUser;
        this.checkSSOUser();
      }
    }, 1000); 

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
     }



  }

  ngAfterViewInit(): void {
    // Important: For _blank first load case
    setTimeout(() => {
      this.setActiveMenuByRoute();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.ssoLoginUserPollingInterval) {
      clearInterval(this.ssoLoginUserPollingInterval);
    }
  }

  private checkSSOUser(): void {
    

    this.sSOLoginDataModel = this.getSSOLoginUser();

    // If SSO user is NULL → clear session & logout
    if (this.sSOLoginDataModel == null) {
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('LoginID');
      sessionStorage.clear();
      localStorage.clear();
      this.IsLogin = false;
      this.cookieService.set('LoginStatus', '');
      this.cookieService.deleteAll();
    }
  }


  private getSSOLoginUser(): any {
    return JSON.parse(String(localStorage.getItem('SSOLoginUser')));
  }

  async Logout() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('LoginID');
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.set('LoginStatus', "");
    this.cookieService.deleteAll();
    try {
      window.location.href = 'https://sso.rajasthan.gov.in/';
      
    }
    catch (Ex) {
      console.log(Ex);

    }
    finally {
      await setTimeout(() => {
        // this.loaderService.requestEnded();
      }, 2);
    }
  }

  
  

  login(): void {
    //this.router.navigate(['/login']);
    window.location.href = 'https://sso.rajasthan.gov.in/';
  }
  isMobileNavOpen = false;

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;

    const body = document.body;
    if (this.isMobileNavOpen) {
      body.classList.add('mobile-nav-active');
    } else {
      body.classList.remove('mobile-nav-active');
    }
    document.body.classList.toggle('mobile-nav-active', this.isMobileNavOpen);

    if (!this.isMobileNavOpen) {
      this.isDropdownOpen1 = false;
      this.isDropdownOpen2 = false;
    }
  }

  isDropdownOpen1 = false;
  isDropdownOpen2 = false;

  toggleDropdown(index: number) {
    if (index === 1) {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    } else if (index === 2) {
      this.isDropdownOpen2 = !this.isDropdownOpen2;
    }
  }

  setCookie(Content: any) {
    this.cookieService.set('language', Content, 7);
    window.location.reload();
  }

  getCookie() {
    const lang = this.cookieService.get('language');
    if (lang === '' || lang === null) {
      this.setCookie('en');
    }
    this.language = lang;

    if (lang === 'en') {
      this.langType = 'hi';
      this.LT = 0;
    }
    else {
      this.langType = 'en';
      this.LT = 1
    }
  }


  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('NavIconsChange') NavIconsChange!: ElementRef;


  MenuShowHide() {
    this.menu.nativeElement.classList.toggle('menuShow');
    this.NavIconsChange.nativeElement.classList.toggle('fa-navicon');
    this.NavIconsChange.nativeElement.classList.toggle('fa-close');
  }
  MenuShowHidePages() {
    this.menu.nativeElement.classList.remove('menuShow');
    this.NavIconsChange.nativeElement.classList.add('fa-navicon');
    this.NavIconsChange.nativeElement.classList.remove('fa-close');
  }
  






  
  increaseFont() {
    if (this.increaseCount < this.maxClicks) {
      this.fontSize += 2;
      this.fontSizeTitle += 3;
      this.tagsHedingLarge += 4;
      this.applyFontSize();
      this.increaseCount++;
      
    } else {
      console.log('Max increase reached');
    }
  }

  decreaseFont() {
    if (this.decreaseCount < this.maxClicks) {
      this.fontSize -= 2;
      this.fontSizeTitle -= 3;
      this.tagsHedingLarge -= 4;
      this.applyFontSize();
      this.decreaseCount++;
      
    } else {
      
    }
  }
  resetFont() {
    this.fontSize = 14;
    this.fontSizeTitle = 34;
    this.tagsHedingLarge = 74;
    this.increaseCount = 0;
    this.decreaseCount = 0;
    const tags = document.querySelectorAll(
      'p, a, li, div, button,input[type=button],input.search-input, .form-control, span:not(h1 span):not(h2 span):not(h3 span):not(h4 span):not(h5 span):not(h6 span)'
    );
    const tagsHeding = document.querySelectorAll(
      'h1.info-title, h2.info-title, h3.info-title, h4.info-title, h5.info-title, h6.info-title'
    );
    const tagsHedingLarge = document.querySelectorAll(
      '.banner-form h1'
    );
    tags.forEach(tag => {
      this.renderer.removeStyle(tag, 'font-size');
    });
    tagsHeding.forEach(tag => {
      this.renderer.removeStyle(tag, 'font-size');
    });
    tagsHedingLarge.forEach(tag => {
      this.renderer.setStyle(tag, 'font-size', this.tagsHedingLarge + 'px');
    });
    
  }
  private applyFontSize() {
    const tags = document.querySelectorAll(
      'p, a, li, div, button,input[type=button],input.search-input, .form-control, span:not(h1 span):not(h2 span):not(h3 span):not(h4 span):not(h5 span):not(h6 span)'
    );
    const tagsHeding = document.querySelectorAll(
      'h1.info-title, h2.info-title, h3.info-title, h4.info-title, h5.info-title, h6.info-title'
    );
    const tagsHedingLarge = document.querySelectorAll(
      '.banner-form h1'
    );
    tags.forEach(tag => {
      this.renderer.setStyle(tag, 'font-size', this.fontSize + 'px');
    });
    tagsHeding.forEach(tag => {
      this.renderer.setStyle(tag, 'font-size', this.fontSizeTitle + 'px');
    });
    tagsHedingLarge.forEach(tag => {
      this.renderer.setStyle(tag, 'font-size', this.tagsHedingLarge + 'px');
    });

   
  }

  goToHome(): void {
    this.router.navigate(['']);
    this.MenuShowHidePages();
    //this.MenuShowHide();
  }

  goToAboutUs(): void {
    this.router.navigate(['AboutUs']);
  }
  //addClass() {
  //  this.isMegaOpen = true;
  //}

  //removeClass() {
  //  this.isMegaOpen = false;
  //}

  setActive(index: number) {
    this.activeIndex = index;
  }


  setTheme(theme: string) {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    themeLink.href = `assets/css/${theme}.css`;
    localStorage.setItem('theme', theme);
  }


  goToDisclaimerAndPolicies(): void {
    this.router.navigate(['DisclaimerAndPolicies']);

  }
  goToOurLeaderships(): void {
    this.router.navigate(['OurLeaderships']);

  }
  goToAnnualReport() {
    this.router.navigate(['AnnualReport']);

  }
  goTocontactus() {
    this.router.navigate(['contactus']);
 
  }
  goToGeneralFAQ() {
    this.router.navigate(['GeneralFAQ']);
    
  }
  goToCancellationRefundPolicy() {
    this.router.navigate(['CancellationRefundPolicy']);

  }

  goToReplyRespondantResponse() {
    this.router.navigate(['ReplyRespondantResponse']);
 
  }

  goToDeflauterList() {
    this.router.navigate(['Deflauterlist']);

  }

  goToNotificationPDF() {
    this.router.navigate(['NotificationPDF']);
  }

  goToListApplication() {
    this.router.navigate(['ListApplication']);
  }

  async GetVisitorCount() {
    
    this.Actionkey = 'GetVisitorCount';
    this.loaderService.requestStarted();

    try {
      const data: any = await this.homeService.GetVisitorCount(this.Actionkey);

      

      // If API returns { Data: value }
      this.GetVisitorCountValue = data?.Data ?? 0;

      
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 500);
    }
  }

  async GetPatchDate() {


    this.loaderService.requestStarted();

    try {
      const response: any = await this.homeService.GetPatchDate();

      this.PatchDate = response?.data ?? "";

    }
    catch (error) {
      console.error(error);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 500);
    }
  }

  async AddVisitorCount() {
    
    this.Actionkey = 'AddVisitorCount';
    this.loaderService.requestStarted();

    try {
      const res: any = await this.homeService.AddVisitorCount(this.Actionkey);

      if (res.message) {
        this.GetVisitorCount();
      }

     

    }
    catch (error) {
      console.error(error);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 500);
    }
  }

  goToProjectSearch() {
    this.router.navigate(['ProjectList']);
  }

  openViolationAct() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/ViolationofAct'])
    );
    window.open(url, '_blank');
  }

  onMegaMenuClick(event: MouseEvent): void {
    const link = event.target as HTMLElement;

    // Find closest li.mega-menu-item
    let li = link.closest('li.mega-menu-item') as HTMLElement;

    if (!li) return;

    // Find outermost parent li.mega-menu-item
    const parents = li.closest('#mega-menu-primary')?.querySelectorAll('li.mega-menu-item');

    const outerLi = li;
    let parent = li.parentElement?.closest('li.mega-menu-item');

    while (parent) {
      const outerLi =  parent;
      parent = parent.parentElement?.closest('li.mega-menu-item');
    }

    // Ensure ID exists
    let id = outerLi.getAttribute('id');

    if (!id) {
      id = 'mega-menu-gen-' + Math.random().toString(36).substring(2, 9);
      outerLi.setAttribute('id', id);
    }

    try {
      sessionStorage.setItem('megaActiveMenuId', id);
    } catch (e) {
      // Ignore if storage disabled
    }

    // No preventDefault — navigation continues normally
  }

  setActiveMenuByRoute(): void {
    const url = this.router.url;

    // Remove previous active class
    const prev = document.querySelector('.mega-current-menu-ancestor');
    if (prev) {
      prev.classList.remove('mega-current-menu-ancestor');
    }

    // HOME (important - first load case)
    if (!url || url === '/' || url === '/home') {
      this.activeMenuId = 'mega-menu-item-110';
      this.MenuShowHidePages();
    }

    // ABOUT
    else if (url.includes('AboutUs') ||
      url.includes('OurLeaderships') ||
      url.includes('AnnualReport') ||
      url.includes('contactus') ||
      url.includes('Contact')) {

      this.activeMenuId = 'mega-menu-item-16';
      this.MenuShowHidePages();
    }

    // HOME BUYER
    else if (url.includes('ProjectList') ||
      url.includes('complaintdetails') ||
      url.includes('ViolationofAct') ||
      url.includes('ViolationActSummary') ||
      url.includes('AgentList')) {

      this.activeMenuId = 'mega-menu-item-17';
      this.MenuShowHidePages();
    }

    // PROMOTER
    else if (url.includes('ProjectSearch')) {

      this.activeMenuId = 'mega-menu-item-192';
      this.MenuShowHidePages();
    }

    // COMPLAINT
    else if (url.includes('CauseList') ||
      url.includes('UpdatedDailyCauseList')) {

      this.activeMenuId = 'mega-menu-item-283';
      this.MenuShowHidePages();
    }

    
    else if (url.includes('OrderList') ||
      url.includes('TenderList') ||
      url.includes('ListApplication') ||
      url.includes('GeneralFAQ') ||
      url.includes('Notification')) {

      this.activeMenuId = 'mega-menu-item-284';
      this.MenuShowHidePages();
    }

    else {
      this.activeMenuId = 'mega-menu-item-110'; // fallback Home
    }

    // Apply class using ID
    if (this.activeMenuId) {
      const element = document.getElementById(this.activeMenuId);
      if (element) {
        element.classList.add('mega-current-menu-ancestor');
      }
    }
  }
  

}
