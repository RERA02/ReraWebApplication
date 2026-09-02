import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclaimerAndPoliciesComponent } from './DisclaimerAndPolicies.component';

const routes: Routes = [{ path: '', component: DisclaimerAndPoliciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisclaimerAndPoliciesRoutingModule { }
