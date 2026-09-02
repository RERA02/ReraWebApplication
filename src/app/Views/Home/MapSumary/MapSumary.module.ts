import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapSumaryRoutingModule } from './MapSumary-routing.module';
import { MapSumaryComponent } from './MapSumary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapSumaryComponent
  ],
  imports: [
    CommonModule,
    MapSumaryRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class MapSumaryModule {
  
}
