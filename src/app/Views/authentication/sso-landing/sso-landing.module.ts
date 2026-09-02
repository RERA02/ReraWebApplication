import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsoLandingRoutingModule } from './sso-landing-routing.module';
import { SsoLandingComponent } from './sso-landing.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SsoLandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SsoLandingRoutingModule,
    MaterialModule
  ]
})
export class SsoLandingModule { }
