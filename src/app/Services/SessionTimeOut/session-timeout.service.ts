import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private timeoutId: any;
  private readonly TIMEOUT_DURATION = 60 * 60 * 1000; // 15 minutes

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  startTimer(): void {
    this.clearTimer();
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => this.handleTimeout());
      }, this.TIMEOUT_DURATION);
    });
  }

  resetTimer(): void {
    this.startTimer();
  }

  clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private handleTimeout(): void {
    
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']); // change if needed
  }
}
