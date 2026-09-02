import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { QPRSummaryRoutingModule } from './QPRSummary-routing.module';
import { QPRSummaryComponent } from './QPRSummary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEnIn from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIn);
@NgModule({
  declarations: [
    QPRSummaryComponent
  ],
  imports: [
    CommonModule,
    QPRSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class QPRSummaryModule {
  
}
