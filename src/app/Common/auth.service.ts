import { Injectable } from '@angular/core';
import { EnumRole } from '../Common/GlobalConstants'; // Update path if needed
import { SSOLoginService } from '../Services/SSOLogin/ssologin.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authService: SSOLoginService
  ) { }

  getRole(): EnumRole {
    const result = this.authService.isLoggedIn();
    return result.RoleID;
  }

  isAuthorized(allowedRoles: EnumRole[]): boolean {
    return allowedRoles.includes(this.getRole());
  }
}
