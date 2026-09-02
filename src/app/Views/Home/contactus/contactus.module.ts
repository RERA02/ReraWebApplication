import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { contactusRoutingModule } from './contactus-routing.module';
import { contactusComponent } from './contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoaderModule } from '../../Shared/loader/loader.module';

import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [
    contactusComponent
  ],
  imports: [
    CommonModule,
    contactusRoutingModule,
      MaterialModule, NgxDatatableModule, FormsModule, ReactiveFormsModule, LoaderModule
  ]
})
export class contactusModule {
  
}
