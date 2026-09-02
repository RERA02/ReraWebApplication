import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APRSummaryComponent } from './APRSummary.component';

const routes: Routes = [{ path: '', component: APRSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APRSummaryRoutingModule { }
