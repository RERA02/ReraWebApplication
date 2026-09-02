import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProModSummaryComponent } from './ProModSummary.component';

const routes: Routes = [{ path: '', component: ProModSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProModSummaryRoutingModule { }
