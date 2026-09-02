import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViolationofActComponent } from './ViolationofAct.component';

const routes: Routes = [{ path: '', component: ViolationofActComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViolationofActRoutingModule { }
