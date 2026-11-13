import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevocationSummaryComponent } from './revocation-summary.component';

const routes: Routes = [{ path: '', component: RevocationSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevocationSummaryRoutingModule { }
