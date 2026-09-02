import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintBoxRoutingModule } from './ComplaintBox-routing.module';
import { ComplaintBoxComponent } from './ComplaintBox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComplaintBoxComponent
  ],
  imports: [
    CommonModule,
    ComplaintBoxRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ComplaintBoxModule {
  
}
