import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PASummaryComponent } from './pa-summary.component';

const routes: Routes = [{ path: '', component: PASummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PASummaryRoutingModule { }
