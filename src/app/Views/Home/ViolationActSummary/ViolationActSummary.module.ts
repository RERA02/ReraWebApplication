import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViolationActSummaryRoutingModule } from './ViolationActSummary-routing.module';
import { ViolationActSummaryComponent } from './ViolationActSummary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViolationActSummaryComponent
  ],
  imports: [
    CommonModule,
    ViolationActSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViolationActSummaryModule {
  
}
