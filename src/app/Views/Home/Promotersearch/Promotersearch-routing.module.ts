import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotersearchComponent } from './Promotersearch.component';

const routes: Routes = [{ path: '', component: PromotersearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotersearchRoutingModule { }
