import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProjectRoutingModule } from './ViewProject-routing.module';
import { ViewProjectComponent } from './ViewProject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewProjectComponent
  ],
  imports: [
    CommonModule,
    ViewProjectRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViewProjectModule {
  
}
