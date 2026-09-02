import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatedDailyCauseListRoutingModule } from './UpdatedDailyCauseList-routing.module';
import { UpdatedDailyCauseListComponent } from './UpdatedDailyCauseList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdatedDailyCauseListComponent
  ],
  imports: [
    CommonModule,
    UpdatedDailyCauseListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class UpdatedDailyCauseListModule {
  
}
