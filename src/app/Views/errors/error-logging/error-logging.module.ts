import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorLoggingRoutingModule } from './error-logging-routing.module';
import { ErrorLoggingComponent } from './error-logging.component';


@NgModule({
  declarations: [
    ErrorLoggingComponent
  ],
  imports: [
    CommonModule,
    ErrorLoggingRoutingModule
  ]
})
export class ErrorLoggingModule { }
