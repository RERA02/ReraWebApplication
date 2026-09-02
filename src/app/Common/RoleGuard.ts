import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EnumRole } from '../Common/GlobalConstants'; // Update if path differs

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['allowedRoles'] as EnumRole[];

    if (allowedRoles && !this.authService.isAuthorized(allowedRoles)) {
      this.router.navigate(['/not-authorized']); // Redirect to a safe page
      return false;
    }

    return true;
  }
}
