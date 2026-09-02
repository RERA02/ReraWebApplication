import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectExtensionViewComponent } from './ProjectExtensionView.component';

const routes: Routes = [{ path: '', component: ProjectExtensionViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectExtensionViewRoutingModule { }
