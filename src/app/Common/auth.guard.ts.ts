import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SSOLoginService } from '../Services/SSOLogin/ssologin.service';
import { ValidateUserRightsModel } from '../Models/SSOLoginDataModel';
import { EnumRole, EnumStatus } from '../Common/GlobalConstants';
import { LoaderService } from '../Services/Loader/loader.service';
import { AppsettingService } from '../Common/appsetting.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(

    private authService: SSOLoginService,
    private router: Router,
    private loaderService: LoaderService,
    private appsettingConfig: AppsettingService,
    private toastr: ToastrService
  ) { }

  //canActivate(
  //  next: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  //  // If the user is logged in, allow navigation, otherwise, redirect to login
  //  if (this.authService.isLoggedIn()) {
  //    return true;
  //  } else {
  //    this.router.navigate(['/login']);
  //    return false;
  //  }
  //}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    debugger;
    this.loaderService.requestStarted();

    try {
      const result = this.authService.isLoggedIn();


      if (!result.IsValidToken) {
        this.router.navigate(['']);
        console.log("result false data null");
        return false;
      }

      if (result.RoleID === 0) {
        this.router.navigate(['/EEMSLanding']);
        return false;
      }

      const allowedRoles = route.data?.['allowedRoles'] as EnumRole[] | undefined;

      // agar route me roles define hi nahi hain → allow
      if (!allowedRoles || allowedRoles.length === 0) {
        return true;
      }

      // RoleID invalid hai → deny
      if (result?.RoleID == null) {
        this.router.navigate(['']);
        return false;
      }

      // enum type safe check
      const hasAccess = allowedRoles.some(
        role => Number(role) === Number(result.RoleID)
      );

      if (!hasAccess) {
        this.router.navigate(['/not-authorized']);
        return false;
      }

      return true;


      // ✅ Optional server-side validation
      const validateModel: ValidateUserRightsModel = {
        SSOID: result.SSOID,
        RoleID: result.RoleID,
        SearchRecordID: result.SearchRecordID,
        PageURL: state.url,
        IsValidToken: result.IsValidToken
      };

      const res = await this.authService.ValidateUserRights(validateModel);
      const data = JSON.parse(JSON.stringify(res));
      const stateCode = data?.State;

      if (stateCode === EnumStatus.Success) {
        return true;
      }

      // Fallback redirects based on role
      switch (validateModel.RoleID) {
        case EnumRole.JOBSEEKER:
          this.router.navigate(['/dashboard/jobseeker']);
          break;
        default:
          this.router.navigate(['']);
      }

      return false;

    } catch (error) {
      console.error('AuthGuard Error:', error);
      this.router.navigate(['']);
      return false;

    } finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 2000);
    }
  }

}
