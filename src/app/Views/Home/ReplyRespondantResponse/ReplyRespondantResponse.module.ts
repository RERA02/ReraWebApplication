import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplyRespondantResponseRoutingModule } from './ReplyRespondantResponse-routing.module';
import { ReplyRespondantResponseComponent } from './ReplyRespondantResponse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReplyRespondantResponseComponent
  ],
  imports: [
    CommonModule,
    ReplyRespondantResponseRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ReplyRespondantResponseModule {
  
}
