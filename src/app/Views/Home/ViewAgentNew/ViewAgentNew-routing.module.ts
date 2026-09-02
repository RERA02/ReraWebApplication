import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAgentNewComponent } from './ViewAgentNew.component';

const routes: Routes = [{ path: '', component: ViewAgentNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAgentNewRoutingModule { }
