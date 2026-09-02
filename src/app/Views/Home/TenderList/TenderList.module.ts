import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderListRoutingModule } from './TenderList-routing.module';
import { TenderListComponent } from './TenderList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TenderListComponent
  ],
  imports: [
    CommonModule,
    TenderListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class TenderListModule {
  
}
