import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnualReportRoutingModule } from './AnnualReport-routing.module';
import { AnnualReportComponent } from './AnnualReport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnnualReportComponent
  ],
  imports: [
    CommonModule,
    AnnualReportRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class AnnualReportModule {
  
}
