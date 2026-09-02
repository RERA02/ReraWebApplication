import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentListRoutingModule } from './AgentList-routing.module';
import { AgentListComponent } from './AgentList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgentListComponent
  ],
  imports: [
    CommonModule,
    AgentListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class AgentListModule {
  
}
