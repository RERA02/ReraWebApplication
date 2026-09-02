import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAgentNewRoutingModule } from './ViewAgentNew-routing.module';
import { ViewAgentNewComponent } from './ViewAgentNew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewAgentNewComponent
  ],
  imports: [
    CommonModule,
    ViewAgentNewRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViewAgentNewModule {
  
}
