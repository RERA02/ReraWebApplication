import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './Summary-routing.module';
import { SummaryComponent } from './Summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class SummaryModule {
  
}
