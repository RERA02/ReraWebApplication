import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotersearchRoutingModule } from './Promotersearch-routing.module';
import { PromotersearchComponent } from './Promotersearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PromotersearchComponent
  ],
  imports: [
    CommonModule,
    PromotersearchRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class PromotersearchModule {
  
}
