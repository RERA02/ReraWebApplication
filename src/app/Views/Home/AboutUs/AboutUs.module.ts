import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './AboutUs-routing.module';
import { AboutUsComponent } from './AboutUs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class AboutUsModule {
  
}
