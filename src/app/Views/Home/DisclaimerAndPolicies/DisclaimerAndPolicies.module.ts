import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclaimerAndPoliciesRoutingModule } from './DisclaimerAndPolicies-routing.module';
import { DisclaimerAndPoliciesComponent } from './DisclaimerAndPolicies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DisclaimerAndPoliciesComponent
  ],
  imports: [
    CommonModule,
    DisclaimerAndPoliciesRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class DisclaimerAndPoliciesModule {
  
}
