import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QPRSummaryComponent } from './QPRSummary.component';

const routes: Routes = [{ path: '', component: QPRSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QPRSummaryRoutingModule { }
