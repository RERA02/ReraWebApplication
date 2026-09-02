import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAgentComponent } from './ViewAgent.component';

const routes: Routes = [{ path: '', component: ViewAgentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAgentRoutingModule { }
