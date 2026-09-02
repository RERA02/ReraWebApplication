import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CauseListRoutingModule } from './CauseList-routing.module';
import { CauseListComponent } from './CauseList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CauseListComponent
  ],
  imports: [
    CommonModule,
    CauseListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class CauseListModule {
  
}
