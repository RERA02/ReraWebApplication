import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { RevocationSummaryRoutingModule } from './revocation-summary-routing.module';
import { RevocationSummaryComponent } from './revocation-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import localeEnIn from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIn);
@NgModule({
  declarations: [
    RevocationSummaryComponent
  ],
  imports: [
    CommonModule,
    RevocationSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
  ,
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class RevocationSummaryModule { }
