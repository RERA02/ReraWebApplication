import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoseekerAssessmentRoutingModule } from './Joseeker-assessment-routing.module';
import { JoseekerAssessmentComponent } from './Joseeker-assessment.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    JoseekerAssessmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JoseekerAssessmentRoutingModule,
    MaterialModule,
    NgbModalModule
  ]
})
export class JoseekerAssessmentModule { }
