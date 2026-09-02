import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contactusComponent } from './contactus.component';

const routes: Routes = [{ path: '', component: contactusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class contactusRoutingModule { }
