import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatedDailyCauseListComponent } from './UpdatedDailyCauseList.component';

const routes: Routes = [{ path: '', component: UpdatedDailyCauseListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatedDailyCauseListRoutingModule { }
