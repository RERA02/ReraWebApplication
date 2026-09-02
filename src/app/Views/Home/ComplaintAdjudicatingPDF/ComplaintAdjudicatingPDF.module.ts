import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintAdjudicatingPDFRoutingModule } from './ComplaintAdjudicatingPDF-routing.module';
import { ComplaintAdjudicatingPDFComponent } from './ComplaintAdjudicatingPDF.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComplaintAdjudicatingPDFComponent
  ],
  imports: [
    CommonModule,
    ComplaintAdjudicatingPDFRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ComplaintAdjudicatingPDFModule {
  
}
