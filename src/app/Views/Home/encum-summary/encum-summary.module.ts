import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { EncumSummaryRoutingModule } from './encum-summary-routing.module';
import { EncumSummaryComponent } from './encum-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import localeEnIn from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIn);
@NgModule({
  declarations: [
    EncumSummaryComponent
  ],
  imports: [
    CommonModule,
    EncumSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
  ,
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class EncumSummaryModule { }
