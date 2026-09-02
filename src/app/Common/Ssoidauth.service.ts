import { Injectable } from '@angular/core';
import { EnumSsoid } from '../Common/GlobalConstants';
import { SSOLoginService } from '../Services/SSOLogin/ssologin.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authService: SSOLoginService) { }

  getSsoid(): EnumSsoid {
    const result = this.authService.isLoggedIn();
    return result.SSOID as EnumSsoid; // ✅ type-cast the string to enum
  }

  isAuthorized(allowedSsoid: EnumSsoid[]): boolean {
    return allowedSsoid.includes(this.getSsoid());
  }
}
