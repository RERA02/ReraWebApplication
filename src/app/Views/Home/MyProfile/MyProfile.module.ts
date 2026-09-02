import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './MyProfile-routing.module';
import { MyProfileComponent } from './MyProfile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class MyProfileModule {
  
}
