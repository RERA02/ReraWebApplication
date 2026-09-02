import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './Ssoidauth.service';
import { EnumSsoid } from '../Common/GlobalConstants'; // Update if path differs

@Injectable({ providedIn: 'root' })
export class SsoisGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedSsoid = route.data['allowedSsoid'] as EnumSsoid[];
    if (allowedSsoid && !this.authService.isAuthorized(allowedSsoid)) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;

  }
}
