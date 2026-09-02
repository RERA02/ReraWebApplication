import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationRefundPolicyComponent } from './CancellationRefundPolicy.component';

const routes: Routes = [{ path: '', component: CancellationRefundPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancellationRefundPolicyRoutingModule { }
