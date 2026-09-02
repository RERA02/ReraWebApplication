import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralFAQRoutingModule } from './GeneralFAQ-routing.module';
import { GeneralFAQComponent } from './GeneralFAQ.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneralFAQComponent
  ],
  imports: [
    CommonModule,
    GeneralFAQRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class GeneralFAQModule {
  
}
