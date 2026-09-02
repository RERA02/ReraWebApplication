import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PASummaryRoutingModule } from './pa-summary-routing.module';
import { PASummaryComponent } from './pa-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PASummaryComponent
  ],
  imports: [
    CommonModule,
    PASummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class PASummaryModule { }
