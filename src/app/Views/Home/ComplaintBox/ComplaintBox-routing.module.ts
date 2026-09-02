import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintBoxComponent } from './ComplaintBox.component';

const routes: Routes = [{ path: '', component: ComplaintBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintBoxRoutingModule { }
