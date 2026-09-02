import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MasterLayoutComponent } from './Views/Shared/master-layout/master-layout.component';
import { MasterLayoutModule } from './Views/Shared/master-layout/master-layout.module';
import { HomeLayoutComponent } from './Views/Shared/home-layout/home-layout.component';
import { HomeLayoutModule } from './Views/Shared/home-layout/home-layout.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleModule } from '@ng-idle/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppsettingService } from './Common/appsetting.service';
import { MaterialModule } from './material.module';
import { LoaderInterceptor } from './Services/Loader/loader.interceptor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoaderModule } from './Views/Shared/loader/loader.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SSOLoginService } from './Services/SSOLogin/ssologin.service';
import { AuthGuard } from './Common/auth.guard.ts';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiKeyInterceptor } from './Services/Interceptor/api-key.interceptor';

import { MatDialogModule } from '@angular/material/dialog';
// Factory function
export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader();
}

// load this before app initiliaze
//export function initializeApp(appsettingService: AppsettingService): () => any {
//  return () => appsettingService.loadAppsetting().subscribe(appsetting => {
//    appsettingService.setAppsetting(appsetting);
//  });
//}

export function initializeApp(appsettingService: AppsettingService) {
  return () => appsettingService.loadAppsetting();
}

@NgModule({
  declarations: [

    
    AppComponent,
    MasterLayoutComponent,
    HomeLayoutComponent,

    
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    MaterialModule,
    CommonModule,
    NgbModule, LoaderModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    NgxDatatableModule, 
    MatDialogModule,
    NgIdleModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    
  ],
  providers: [
    AuthGuard,
    SSOLoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },

    NgbActiveModal,
    MaterialModule,
    AppsettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppsettingService],
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()), // ✅ This is fine
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}


