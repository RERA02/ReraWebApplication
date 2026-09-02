import { Component, ViewEncapsulation, HostListener, Renderer2 } from '@angular/core';
import { SessionTimeoutService } from './Services/SessionTimeOut/session-timeout.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, take } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppComponent {
  title = 'RERA';
  constructor(private sessionTimeout: SessionTimeoutService, private swUpdate: SwUpdate, private renderer: Renderer2, private router: Router) {
   
    //sessionStorage.removeItem('userid');
    //sessionStorage.removeItem('LoginID');
    //sessionStorage.clear();
    //localStorage.clear();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (event): event is VersionReadyEvent =>
              event.type === 'VERSION_READY'
          ),
          take(1) // ensure popup shows only once
        )
        .subscribe(() => {
          if (confirm('New version available. Reload now?')) {
            window.location.reload();
          }
        });
    }
    //this.swUpdate.versionUpdates
    //  .pipe(
    //    filter(
    //      (event): event is VersionReadyEvent =>
    //        event.type === 'VERSION_READY'
    //    ),
    //    take(1)
    //  )
    //  .subscribe(() => {
    //    if (confirm('New version available. Reload now?')) {
    //      this.swUpdate.activateUpdate().then(() => {
    //        document.location.reload();
    //      });
    //    }
    //  });
  }



  ngOnInit(): void {
    this.sessionTimeout.startTimer();
    this.renderer.listen('document', 'click', (event: any) => {
      const head = event.target.closest('.custom-nav .head h2');
      if (head) {
        const parent = head.closest('.custom-nav');
        const desc = parent?.querySelector('.desc');
        const icon = head.querySelector('i');
        if (desc) {
          desc.classList.toggle('showDesc');
        }
        if (icon) {
          icon.classList.toggle('fa-filter');
          icon.classList.toggle('fa-close');
        }
      }
    });
  }




  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  handleUserActivity(): void {
    this.sessionTimeout.resetTimer();
  }
  //setTheme(theme: string) {
  //  alert(theme);
  //  const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
  //  if (themeLink) {
  //    themeLink.href = `assets/css/${theme}.css`;
  //    //console.log("Theme changed to:", themeLink.href);
  //  }
  //}
}
