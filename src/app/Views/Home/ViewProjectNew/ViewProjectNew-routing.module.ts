import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectNewComponent } from './ViewProjectNew.component';

const routes: Routes = [{ path: '', component: ViewProjectNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProjectNewRoutingModule { }
