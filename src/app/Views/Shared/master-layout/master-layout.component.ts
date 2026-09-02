import { Component, OnInit, TemplateRef, ViewChild, Renderer2, ElementRef, Inject, PLATFORM_ID, signal, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EnumDepartment, EnumRole, EnumStatus, GlobalConstants } from '../../../Common/GlobalConstants';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { LoaderService } from '../../../Services/Loader/loader.service';
/*import { MenuService } from '../../../Services/Menu/menu.service';*/
import { DOCUMENT, isPlatformBrowser, PlatformLocation } from '@angular/common';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from '../../../Services/Menu/menu.service';
import { HttpClient } from '@angular/common/http';
import { AppsettingService } from '../../../Common/appsetting.service';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
import { MenuByUserAndRoleWiseModel } from '../../../Models/MenuByUserAndRoleWiseModel';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApplyForNotifications, NotificationList } from '../../../Models/CommonMasterDataModel';
import { MatMenuTrigger } from '@angular/material/menu';
declare var window: any;
@Component({
  selector: 'master-layout-page',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css'],
  standalone: false
})
export class MasterLayoutComponent implements OnInit {
  sSOLoginDataModel = new SSOLoginDataModel();
  UserName: any = '';
  public MenuHTML: any = "";
  public lstUserRole: any = []
  public lstFinancialYear: any = []
  public RoleID: number = 0;
  public fileUpload: any = {};
  public folder: string = "test";
  public _EnumRole = EnumRole;
  public HostelID: number = 0;
  public _EnumDepartment = EnumDepartment;
  public Datalist: any = [];
  public EndTermID: number = 0;
  public TermPart: number = 0;
  public DepartmentID: number = 0
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  closeResult: string | undefined;
  modalReference: NgbModalRef | undefined;
  groupedMenuData: any;
  isBackdropVisible: boolean = false;
  isMobile$: any;
  searchTerm: string = '';
  filterMenuData!: any;
  isMobileSubscription: Subscription | undefined;
  @ViewChild('htmlElement') htmlElement!: ElementRef;
  @ViewChild('mymodalSessionExpired') mymodalSessionExpired: TemplateRef<any> | undefined;
  @ViewChild('appMenu', { static: false }) appMenu!: ElementRef;
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  public MultiHostelWardenRoleList: any = [];
  private ssoLoginUserPollingInterval: any;
  private previousSSOUser: string | null = null;
  isNotificationOpen = false;
  public NotificationList: any = [];
  public NotificationCountList: any = [];
  ApplyNotificationList: { NotificationId: number, JobPostId: number }[] = [];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  constructor(private breakpointObserver: BreakpointObserver, private el: ElementRef, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private loaderService: LoaderService,
    private sanitizer: DomSanitizer, location: PlatformLocation, private idle: Idle, private modalService: NgbModal, private commonFunctionService: CommonFunctionService,
    private cookieService: CookieService, private toastr: ToastrService, private menuService: MenuService, private http: HttpClient, public appsettingConfig: AppsettingService, private renderer: Renderer2) {
    this.setupIdle();
    // this.setupIdle();
    location.onPopState(() => {
      console.log('pressed back in add!!!!!');
    });
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  
  async ngOnInit() {
    const storedData = localStorage.getItem('SSOLoginUser');
    if (storedData) {
      this.sSOLoginDataModel = JSON.parse(storedData);

      this.RoleID = this.sSOLoginDataModel?.RoleID;
      await this.GetUserRoleList();
      await this.LoadMenu(this.sSOLoginDataModel.UserID, this.sSOLoginDataModel.RoleID);

      this.ssoLoginUserPollingInterval = setInterval(() => {
        const currentUser = localStorage.getItem('SSOLoginUser');
        if (this.previousSSOUser !== currentUser) {
          this.previousSSOUser = currentUser;
          this.checkSSOUser();
        }
      }, 1000);
      this.showActiveCurrentPage();
      this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
        map(result => result.matches)
      );
      this.isMobileSubscription = this.isMobile$.subscribe((isMobile: any) => {
        const htmlElement = this.document.documentElement;
        if (isMobile) {
          this.renderer.addClass(htmlElement, 'sidenav-enable');
        } else {
          this.renderer.removeClass(htmlElement, 'sidenav-enable');
        }
      });
      await this.ChangeCSS();
      this.GetUserData();
    } else {
      console.log('No data found in localStorage');
      this.toastr.warning("No data null found in localStorage.");
    }

    if(this.sSOLoginDataModel.RoleID == this._EnumRole.JOBSEEKER)
    {

     await this.GetNotifications();

    }

  }

  ngOnDestroy(): void {
    if (this.ssoLoginUserPollingInterval) {
      clearInterval(this.ssoLoginUserPollingInterval);
    }
    if (this.isMobileSubscription) {
      this.isMobileSubscription.unsubscribe();
    }
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);

    this.idle.stop(); 
    this.idle.clearInterrupts(); 
  }
  setupIdle(): void {
    
    console.log('setupIdle testing');
    //  10 minutes idle
    this.idle.setIdle(600);
    // 30 minutes idle
    //this.idle.setIdle(1800);
    this.idle.setTimeout(1);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
    });
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
    });
    this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleState = `You will time out in ${countdown} seconds!`;
    });
    this.idle.onTimeout.subscribe(() => {
      
      this.idleState = 'Timed out!';
      this.timedOut = true;
      let timerInterval: any;
      let timeLeft = 60;
      Swal.fire({
        title: 'Session Expiration Warning',
        html: `Your session will expire in <b>${timeLeft}</b> seconds.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log out now',
        cancelButtonText: 'Stay logged in',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 60000,
        didOpen: () => {
          const content = Swal.getHtmlContainer()?.querySelector('b');
          timerInterval = setInterval(() => {
            timeLeft--;
            if (content) content.textContent = timeLeft.toString();
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (
          result.dismiss === Swal.DismissReason.timer ||
          result.isConfirmed
        ) {
          sessionStorage.clear();
          localStorage.clear();
          this.btnOk();
        } else {
         
          this.idle.watch();
          this.idleState = 'Idle timer restarted after cancel.';
        }
      });
    });
    this.idle.watch();
  }


  //setupIdle(): void {
  //  console.log('setupIdle testing');
  //  // Set idle after 10 minutes (600 seconds)
  //  this.idle.setIdle(120);

  //  // Trigger timeout warning at 10 minutes (this will actually be our custom SweetAlert)
  //  this.idle.setTimeout(100); // keep it short, since we're handling with SweetAlert

  //  this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //  this.idle.onIdleStart.subscribe(() => {
  //    this.idleState = "You've gone idle!";
  //  });

  //  this.idle.onIdleEnd.subscribe(() => {
  //    this.idleState = 'No longer idle.';
  //  });

  //  this.idle.onTimeoutWarning.subscribe((countdown: number) => {
  //    this.idleState = `You will time out in ${countdown} seconds!`;
  //  });

  //  this.idle.onTimeout.subscribe(() => {
  //    this.idleState = 'Timed out!';
  //    this.timedOut = true;

  //    // Show SweetAlert with 1-minute timer
  //    let timerInterval: any;
  //    let timeLeft = 60;

  //    Swal.fire({
  //      title: 'Session Expiration Warning',
  //      html: `Your session will expire in <b>${timeLeft}</b> seconds.`,
  //      icon: 'warning',
  //      showCancelButton: true,
  //      confirmButtonText: 'Log out now',
  //      cancelButtonText: 'Stay logged in',
  //      allowOutsideClick: false,
  //      allowEscapeKey: false,
  //      timer: 60000,
  //      didOpen: () => {
  //        const content = Swal.getHtmlContainer()?.querySelector('b');
  //        timerInterval = setInterval(() => {
  //          timeLeft--;
  //          if (content) content.textContent = timeLeft.toString();
  //        }, 1000);
  //      },
  //      willClose: () => {
  //        clearInterval(timerInterval);
  //      }
  //    }).then((result) => {
  //      if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
  //        // Timeout or clicked OK — clear session
  //        sessionStorage.removeItem('userid');
  //        sessionStorage.removeItem('LoginID');
  //        sessionStorage.clear();
  //        localStorage.clear();
  //        /*this.toastr.warning("User session invalid. Please try login after some time.");*/
  //        this.btnOk();
  //      } else if (result.isDismissed) {
  //        // Cancel clicked — do nothing, reset idle watcher
  //        this.idle.watch(); // restart idle monitoring
  //        this.idleState = 'Idle timer restarted after cancel.';
  //      }
  //    });
  //  });

  //  this.idle.watch();
  //}


  private getSSOLoginUser(): any {
    return JSON.parse(String(localStorage.getItem('SSOLoginUser')));
  }

  private checkSSOUser(): void {
    this.sSOLoginDataModel = this.getSSOLoginUser();
    if (this.sSOLoginDataModel == null) {
      this.Logout();
    }
    else {
      if (this.sSOLoginDataModel.SSOID == null && this.sSOLoginDataModel.SSOID == '' && this.sSOLoginDataModel.SSOID == undefined) {
        this.Logout();
      }
    }
  }

  async ChangeRolenFY() {
    // set from session
    this.sSOLoginDataModel = await JSON.parse(String(localStorage.getItem('SSOLoginUser')));
    this.RoleID = this.sSOLoginDataModel.RoleID;

    this.commonFunctionService.setsSOLoginDataModel(this.sSOLoginDataModel);
    // load
    await this.GetUserRoleList();
    await this.LoadMenu(this.sSOLoginDataModel.UserID, this.sSOLoginDataModel.RoleID);
    //call google translation

    if (isPlatformBrowser(this.platformId)) {
      if (typeof window.LoadData === 'function') {
        window.LoadData();

      }
    }
    await this.ChangeCSS();
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }

  CloseModelPoput() {
    this.modalService.dismissAll();
  }

  parseUrl(url: string) {
    if (!url) {
      return { path: '', queryParams: {} };  // Return empty values if URL is invalid
    }

    const [path, query] = url.split('?');
    const queryParams = query ? this.parseQueryParams(query) : {};
    return { path, queryParams };
  }

  parseQueryParams(query: string) {
    const params: { [key: string]: string } = {};
    const pairs = query.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[key] = value;
      }
    });
    return params;
  }

  async GetUserRoleList() {
    try {
      this.loaderService.requestStarted();

      await this.menuService.GetUserRoleList(this.sSOLoginDataModel.SSOID, this.sSOLoginDataModel.DepartmentID, true, this.sSOLoginDataModel.RoleID)
        .then((RoleData: any) => {
          RoleData = JSON.parse(JSON.stringify(RoleData));
          this.lstUserRole = RoleData['Data'][0];
          // this.lstUserRole = RoleData['Data'];
          //this.loaderService.requestEnded();
        }, error => console.error(error));
    }
    catch (Ex) {
      console.log(Ex);

    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 10);
    }
  }

  async Profile() {
    debugger
    console.log(this.lstUserRole);
    if (this.lstUserRole?.RoleID === this.sSOLoginDataModel.RoleID && this.lstUserRole.UserID === this.sSOLoginDataModel.UserID && this.lstUserRole?.RoleName == 'Employer') {
      this.router.navigate(['/EmployerProfile']);
    }
    else if (this.lstUserRole?.RoleID === this.sSOLoginDataModel.RoleID && this.lstUserRole.UserID === this.sSOLoginDataModel.UserID && this.lstUserRole?.RoleName == 'JOB SEEKER') {
      this.router.navigate(['/dashboard/jobseeker/ProfileView']);
    }
    else if (this.lstUserRole?.RoleID === this.sSOLoginDataModel.RoleID && this.lstUserRole.UserID === this.sSOLoginDataModel.UserID && this.lstUserRole?.RoleName == 'Counseller') {
      this.router.navigate(['/dashboard/counsellor']);
    }
    else {
      this.router.navigate(['']);
    }
  }

  // when role change
  async loadMenuByRoleID(SeletedUserId: any) {
    var r = this.lstUserRole.filter((x: any) => x.RoleID == this.RoleID)[0];
    this.sSOLoginDataModel.RoleID = this.RoleID;
    localStorage.setItem('SSOLoginUser', JSON.stringify(this.sSOLoginDataModel))
    await this.ChangeRolenFY()
  }

  groupMenuItems(menuItems: any[]) {
    if (!Array.isArray(menuItems)) {
      console.error("The provided menuItems is not an array.");
      return;
    }
    const groupedData: any[] = [];
    menuItems.forEach((item) => {
      if (item.ParentId === 0) {
        groupedData.push({ ...item, children: [] });
      }
    });
    menuItems.forEach((item) => {
      if (item.ParentId !== 0) {
        const parent = groupedData.find((parent) => parent.MenuId === item.ParentId);
        if (parent) {
          parent.children.push(item);
        } else {
          console.warn(`Parent with MenuId ${item.ParentId} not found for item ${item.MenuName}`);
        }
      }
    });
    this.groupedMenuData = groupedData;
  }

  js_SubMenu(event: any): void {
    const clickedElement = event.currentTarget; // safer than event.target
    const parentLi = clickedElement.closest('li');

    if (parentLi) {
      const allLis = this.el.nativeElement.querySelectorAll('li');
      allLis.forEach((li: HTMLElement) => li.classList.remove('showChildMenu'));
      parentLi.classList.add('showChildMenu');
    }
  }

  js_SubMenuActive(event: any): void {
    const clickedElement = event.currentTarget; // safer
    const parentLi = clickedElement.closest('li');

    if (parentLi) {
      const allLis = this.el.nativeElement.querySelectorAll('li');
      allLis.forEach((li: HTMLElement) => li.classList.remove('showChildMenu'));
      parentLi.classList.add('showChildMenu');
    }

    // highlight the clicked submenu link
    const allSubMenus = this.el.nativeElement.querySelectorAll('.dropdown-menu .dropdown-item');
    allSubMenus.forEach((a: HTMLElement) => a.classList.remove('active'));

    clickedElement.classList.add('active');
  }

  toggleMenu(event: any): void {
    const bodyElement = this.document.body;
    const htmlElement = this.document.documentElement;
    const isOverflowHidden = bodyElement.style.overflow === 'hidden';
    if (isOverflowHidden) {
      this.renderer.setStyle(bodyElement, 'overflow', '');
      this.isMobile$.subscribe((isMobile: any) => {
        const htmlElement = this.document.documentElement;
        if (!isMobile) {
          this.renderer.setAttribute(htmlElement, 'data-sidebar-view', 'default');
        } else {
          const backdropElement = this.renderer.createElement('div');
          this.renderer.setAttribute(backdropElement, 'id', 'app-menu-backdrop');
          this.renderer.setAttribute(backdropElement, 'data-hs-overlay-backdrop-template', '');
          this.renderer.setStyle(backdropElement, 'z-index', '59');
          this.renderer.setStyle(backdropElement, 'position', 'fixed');
          this.renderer.setStyle(backdropElement, 'top', '0');
          this.renderer.setStyle(backdropElement, 'left', '0');
          this.renderer.setStyle(backdropElement, 'right', '0');
          this.renderer.setStyle(backdropElement, 'bottom', '0');
          this.renderer.setStyle(backdropElement, 'background-color', 'rgba(0, 0, 0, 0.5)');
          this.renderer.setStyle(backdropElement, 'opacity', '0.5');
          this.renderer.addClass(backdropElement, 'hs-overlay-backdrop');
          this.renderer.appendChild(bodyElement, backdropElement);
          this.renderer.listen(backdropElement, 'click', () => this.onBackdropClick());
        }
      });
    } else {
      this.renderer.setStyle(bodyElement, 'overflow', 'hidden');
      this.isMobile$.subscribe((isMobile: any) => {
        const htmlElement = this.document.documentElement;
        if (!isMobile) {
          this.renderer.setAttribute(htmlElement, 'data-sidebar-view', 'hidden');
        } else {
          const backdropElement = this.renderer.createElement('div');
          this.renderer.setAttribute(backdropElement, 'id', 'app-menu-backdrop');
          this.renderer.setAttribute(backdropElement, 'data-hs-overlay-backdrop-template', '');
          this.renderer.setStyle(backdropElement, 'z-index', '59');
          this.renderer.setStyle(backdropElement, 'position', 'fixed');
          this.renderer.setStyle(backdropElement, 'top', '0');
          this.renderer.setStyle(backdropElement, 'left', '0');
          this.renderer.setStyle(backdropElement, 'right', '0');
          this.renderer.setStyle(backdropElement, 'bottom', '0');
          this.renderer.setStyle(backdropElement, 'background-color', 'rgba(0, 0, 0, 0.5)');
          this.renderer.setStyle(backdropElement, 'opacity', '0.5');
          this.renderer.addClass(backdropElement, 'hs-overlay-backdrop');
          this.renderer.appendChild(bodyElement, backdropElement);
          this.renderer.listen(backdropElement, 'click', () => this.onBackdropClick());
        }
      });
    }
    if (this.appMenu && this.appMenu.nativeElement) {
      const appMenuElement = this.appMenu.nativeElement;
      appMenuElement.classList.toggle('hidden');
      appMenuElement.classList.toggle('open');
    }
  }
  onBackdropClick() {
    const bodyElement = this.document.body;
    const menuElement = this.el.nativeElement.querySelector('#app-menu');
    if (this.isBackdropVisible) {
      this.renderer.setStyle(bodyElement, 'overflow', 'hidden');
      if (menuElement) {
        this.renderer.addClass(menuElement, 'open');
        this.renderer.removeClass(menuElement, 'hidden');
      }
    } else {
      this.renderer.removeStyle(bodyElement, 'overflow');
      const backdropElement = this.document.getElementById('app-menu-backdrop');
      if (backdropElement) {
        this.renderer.removeChild(bodyElement, backdropElement);
      }
      if (menuElement) {
        this.renderer.removeClass(menuElement, 'open');
        this.renderer.addClass(menuElement, 'hidden');
      }
    }
  }
  profileDropdown(event: any): void {
    const clickedElement = event.target;
    const dropdownContainer = clickedElement.closest('.hs-dropdown');
    if (dropdownContainer) {
      dropdownContainer.classList.toggle('open');
    }
    const dropdownMenu = dropdownContainer?.querySelector('.hs-dropdown-menu');
    if (dropdownMenu) {
      dropdownMenu.classList.toggle('open');
      dropdownMenu.classList.toggle('hidden');
    }
  }
  showActiveCurrentPage(): void {
    const pageName = window.location.pathname;
    const sanitizedPageName = pageName.replace(/#/g, '');
    setTimeout(() => {
      const adminMenu = this.el.nativeElement.querySelector('.admin-menu');
      if (!adminMenu) {
        console.error('Admin menu not found.');
        return;
      }
      const allLinks = adminMenu.querySelectorAll('a');
      allLinks.forEach((link: HTMLAnchorElement) => {
        this.renderer.removeClass(link, 'active');
      });
      let activeLink!: HTMLElement;
      allLinks.forEach((link: HTMLAnchorElement) => {
        const linkHref = link.getAttribute('href');
        const linkRouterLink = link.getAttribute('routerLink');
        if (linkHref && linkHref.includes(sanitizedPageName)) {
          activeLink = link;
        } else if (linkRouterLink && linkRouterLink.includes(sanitizedPageName)) {
          activeLink = link;
        }
      });
      if (activeLink) {
        this.renderer.addClass(activeLink, 'active');
        let parentLi = activeLink.closest('.menu-item');

        if (parentLi) {
          this.renderer.addClass(parentLi, 'showChildMenu');
          parentLi = parentLi.closest('.menu-item');
        }
      }
    }, 500);
  }
  filteredItems() {
    if (this.searchTerm && this.filterMenuData.Data) {
      return this.filterMenuData.Data.filter((menu: { MenuName: string; }) =>
        menu.MenuName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  //Load Menu
  async LoadMenu(UserID: number, RoleID: number) {
    try {
      let model: MenuByUserAndRoleWiseModel = {
        DepartmentID: this.sSOLoginDataModel.DepartmentID,
        Eng_NonEng: this.sSOLoginDataModel.Eng_NonEng,
        EndTermID: this.sSOLoginDataModel.EndTermID,
        RoleID: RoleID,
        UserID: UserID
      };
      //
      await this.menuService.MenuUserandRoleWise(model)
        .then((MenuData: any) => {
          MenuData = JSON.parse(JSON.stringify(MenuData));
          this.filterMenuData = MenuData;
          if (MenuData != null) {
            this.groupMenuItems(MenuData['Data']);
          }
        }, error => console.error(error));
    }

    catch (Ex) {
      console.log(Ex);
    }

    finally {
      setTimeout(() => {
        // this.loaderService.requestEnded();
      }, 100);
    }
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
     // this.router.navigate(['/login']);  // comment on 19122025
      await this.menuService.BackToSSO(this.appsettingConfig.BacktoSSOURL?.toString());  // new added 19122025
      this.modalService.dismissAll();
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

  async BackToSSO() {
    console.log("BAck to SSO...");

    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('LoginID');
    sessionStorage.clear();
    localStorage.clear();
    try {
      this.loaderService.requestStarted();
      await this.menuService.BackToSSO(this.appsettingConfig.BacktoSSOURL?.toString());
      this.modalService.dismissAll();
    }
    catch (Ex) {
      console.log(Ex);

    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 100);
    }
  }

  btnOk() {
    this.BackToSSO();
  }

  showChildMenu(elem: HTMLElement): void {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => item.classList.remove('showChildMenu'));

    let parent = elem.closest('li');
    if (parent) {
      parent.classList.add('showChildMenu');
    }
  }

  ChangeCSS() {

    this.applyCSSClassBasedOnRole(this.DepartmentID);
  }
  private applyCSSClassBasedOnRole(DepartmentID: number) {
    this.renderer.removeClass(document.body, 'ITIPortal');
    this.renderer.removeClass(document.body, 'BTER');
    if (DepartmentID == 2) {
      this.renderer.addClass(document.body, 'ITIPortal');
    }
    else {
      this.renderer.addClass(document.body, 'BTER');
    }

  }


  async GetUserData() {
    try {
      let UserId = this.sSOLoginDataModel.UserID;
      this.loaderService.requestStarted();
      

    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  BackToSSOButton() {
    window.location.href = 'https://sso.rajasthan.gov.in/'
  }

  toggleNotification() {
    this.isNotificationOpen = !this.isNotificationOpen;
   
  }

  closeNotification() {
    this.isNotificationOpen = false;
  
  }

  async GetNotifications() {
    try {
      debugger
      this.loaderService.requestStarted();    
      await this.commonFunctionService.GetNotifications(this.sSOLoginDataModel.UserID,"NotificationCount")
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          if (data.Data.length > 0) {
            this.NotificationList = data.Data;
            this.NotificationCountList = data.Data.filter((x: any) => x.IsRead == 0);

          }
          else {
            this.NotificationList = [];
          }
          console.log(this.NotificationList)
        });
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }

  getTimeAgo(createdDate: any): string {

    if (!createdDate) {
      return '';
    }

    const created = new Date(createdDate);

    if (isNaN(created.getTime())) {
      return '';
    }

    const now = new Date();
    const diffMs = now.getTime() - created.getTime();

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'just now';

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;

    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  }
  viewAllNotification() {
    debugger
    if (!this.NotificationList || this.NotificationList.length === 0) {
      this.toastr.error('Please select at least one Notification');
      return;
    }

    
    this.ApplyNotificationList = [];


    this.NotificationList.forEach((noti: any) => {
      this.ApplyNotificationList.push({
        NotificationId: noti.Id,
        JobPostId: noti.JobPostId
      });
    });

    
    this.SaveData();
  }
  async SaveData() {
   
    debugger
    const applyForNotificationsModels = new ApplyForNotifications();
    applyForNotificationsModels.CreatedBy = this.sSOLoginDataModel.UserID;

    applyForNotificationsModels.NotificationList =
      this.ApplyNotificationList.map(job => {
        const modelList = new NotificationList();
        modelList.JobPostId = job.JobPostId;
        modelList.NotificationId = job.NotificationId;
        return modelList;
      });

    try {
      this.loaderService.requestStarted();

      const data: any =
        await this.commonFunctionService.SaveDataNotificationRead(applyForNotificationsModels);

      const result = typeof data === 'string' ? JSON.parse(data) : data;

      this.loaderService.requestEnded();

      if (result.State === EnumStatus.Success) {
        this.ApplyNotificationList = [];
        this.router.navigate(['/jobseeker-notifications']);
        // Optional: UI update
        // this.NotificationList.forEach(x => x.IsRead = 1);
        this.isNotificationOpen = false;
        await this.GetNotifications();

      } else {
        this.toastr.error(result.Message || 'Failed to notification read');
      }

    } catch (error) {
      this.loaderService.requestEnded();
      console.error(error);
      this.toastr.error('An error occurred while saving');
    }
  }
  async SaveDataOneJob() {
   
    debugger
    const applyForNotificationsModels = new ApplyForNotifications();
    applyForNotificationsModels.CreatedBy = this.sSOLoginDataModel.UserID;

    applyForNotificationsModels.NotificationList =
      this.ApplyNotificationList.map(job => {
        const modelList = new NotificationList();
        modelList.JobPostId = job.JobPostId;
        modelList.NotificationId = job.NotificationId;
        return modelList;
      });

    try {
      this.loaderService.requestStarted();

      const data: any =
        await this.commonFunctionService.SaveDataNotificationRead(applyForNotificationsModels);

      const result = typeof data === 'string' ? JSON.parse(data) : data;

      this.loaderService.requestEnded();

      if (result.State === EnumStatus.Success) {
        this.ApplyNotificationList = [];
        this.router.navigate(['/job-seeker/job-matching-apply']);
        this.isNotificationOpen = false;   
        await this.GetNotifications();

      } else {
        this.toastr.error(result.Message || 'Failed to notification read');
      }

    } catch (error) {
      this.loaderService.requestEnded();
      console.error(error);
      this.toastr.error('An error occurred while saving');
    }
  }

  async redirectToJob(JobpostId:number)
  {
    this.menuTrigger.closeMenu();
    if (!this.NotificationList || this.NotificationList.length === 0) {
      this.toastr.error('Please select at least one Notification');
      return;
    }


    this.ApplyNotificationList = [];


    this.NotificationList.forEach((noti: any) => {
      this.ApplyNotificationList.push({
        NotificationId: noti.Id,
        JobPostId: noti.JobPostId
      });
    });


    this.SaveDataOneJob();
  }

}

