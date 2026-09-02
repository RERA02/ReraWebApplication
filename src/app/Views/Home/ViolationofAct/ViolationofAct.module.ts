import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViolationofActRoutingModule } from './ViolationofAct-routing.module';
import { ViolationofActComponent } from './ViolationofAct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViolationofActComponent
  ],
  imports: [
    CommonModule,
    ViolationofActRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViolationofActModule {
  
}
