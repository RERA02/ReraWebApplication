import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './OrderList-routing.module';
import { OrderListComponent } from './OrderList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class OrderListModule {
  
}
