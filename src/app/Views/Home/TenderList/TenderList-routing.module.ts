import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenderListComponent } from './TenderList.component';

const routes: Routes = [{ path: '', component: TenderListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderListRoutingModule { }
