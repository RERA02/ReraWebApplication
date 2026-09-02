import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAgentRoutingModule } from './ViewAgent-routing.module';
import { ViewAgentComponent } from './ViewAgent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewAgentComponent
  ],
  imports: [
    CommonModule,
    ViewAgentRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ViewAgentModule {
  
}
