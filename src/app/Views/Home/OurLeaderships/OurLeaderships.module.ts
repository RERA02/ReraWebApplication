import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurLeadershipsRoutingModule } from './OurLeaderships-routing.module';
import { OurLeadershipsComponent } from './OurLeaderships.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OurLeadershipsComponent
  ],
  imports: [
    CommonModule,
    OurLeadershipsRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class OurLeadershipsModule {
  
}
