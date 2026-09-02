import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychometricTestRoutingModule } from './psychometric-test-routing.module';
import { PsychometricTestComponent } from './psychometric-test.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PsychometricTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PsychometricTestRoutingModule,
    MaterialModule
  ]
})
export class PsychometricTestModule { }
