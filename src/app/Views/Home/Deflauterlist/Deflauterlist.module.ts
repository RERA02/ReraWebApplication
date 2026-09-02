import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeflauterlistRoutingModule } from './Deflauterlist-routing.module';
import { DeflauterlistComponent } from './Deflauterlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   DeflauterlistComponent
  ],
  imports: [
    CommonModule,
    DeflauterlistRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class DeflauterlistModule {
  
}
