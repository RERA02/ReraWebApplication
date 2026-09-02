import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { complaintdetailsRoutingModule } from './complaintdetails-routing.module';
import { complaintdetailsComponent } from './complaintdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    complaintdetailsComponent
  ],
  imports: [
    CommonModule,
    complaintdetailsRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class complaintdetailsModule {
  
}
