import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginProcessRoutingModule } from './LoginProcess-routing.module';
import { LoginProcessComponent } from './LoginProcess.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   LoginProcessComponent
  ],
  imports: [
    CommonModule,
   LoginProcessRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class LoginProcessModule {
  
}
