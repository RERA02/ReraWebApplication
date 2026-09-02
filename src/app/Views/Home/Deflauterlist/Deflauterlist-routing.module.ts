import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeflauterlistComponent } from './Deflauterlist.component';

const routes: Routes = [{ path: '', component: DeflauterlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeflauterlistRoutingModule { }
