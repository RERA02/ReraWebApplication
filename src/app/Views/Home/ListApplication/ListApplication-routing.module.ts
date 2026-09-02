import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApplicationComponent } from './ListApplication.component';

const routes: Routes = [{ path: '', component: ListApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListApplicationRoutingModule { }
