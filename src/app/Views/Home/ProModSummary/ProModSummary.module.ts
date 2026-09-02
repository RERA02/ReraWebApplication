import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ProModSummaryRoutingModule } from './ProModSummary-routing.module';
import { ProModSummaryComponent } from './ProModSummary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEnIn from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIn);
@NgModule({
  declarations: [
    ProModSummaryComponent
  ],
  imports: [
    CommonModule,
    ProModSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
  ,
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class ProModSummaryModule {
  
}
