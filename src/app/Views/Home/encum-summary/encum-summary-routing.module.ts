import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncumSummaryComponent } from './encum-summary.component';

const routes: Routes = [{ path: '', component: EncumSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncumSummaryRoutingModule { }
