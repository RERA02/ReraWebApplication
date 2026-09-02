import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancellationRefundPolicyRoutingModule } from './CancellationRefundPolicy-routing.module';
import { CancellationRefundPolicyComponent } from './CancellationRefundPolicy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CancellationRefundPolicyComponent
  ],
  imports: [
    CommonModule,
    CancellationRefundPolicyRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class CancellationRefundPolicyModule {
  
}
