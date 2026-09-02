import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APRSummaryRoutingModule } from './APRSummary-routing.module';
import { APRSummaryComponent } from './APRSummary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    APRSummaryComponent
  ],
  imports: [
    CommonModule,
    APRSummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class APRSummaryModule {
  
}
