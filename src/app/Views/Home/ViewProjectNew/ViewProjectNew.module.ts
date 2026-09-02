import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProjectNewRoutingModule } from './ViewProjectNew-routing.module';
import { ViewProjectNewComponent } from './ViewProjectNew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewProjectNewComponent
  ],
  imports: [
    CommonModule,
    ViewProjectNewRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViewProjectNewModule {
  
}
