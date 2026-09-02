import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPDFRoutingModule } from './NotificationPDF-routing.module';
import { NotificationPDFComponent } from './NotificationPDF.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotificationPDFComponent
  ],
  imports: [
    CommonModule,
    NotificationPDFRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class NotificationPDFModule {
  
}
