import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './ProjectList-routing.module';
import { ProjectListComponent } from './ProjectList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ProjectListModule {
  
}
