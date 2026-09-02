import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurLeadershipsComponent } from './OurLeaderships.component';

const routes: Routes = [{ path: '', component: OurLeadershipsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurLeadershipsRoutingModule { }
