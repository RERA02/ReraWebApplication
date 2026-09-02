import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenReaderAccessRoutingModule } from './ScreenReaderAccess-routing.module';
import { ScreenReaderAccessComponent } from './ScreenReaderAccess.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScreenReaderAccessComponent
  ],
  imports: [
    CommonModule,
    ScreenReaderAccessRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class ScreenReaderAccessModule {
  
}
