import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapSumaryComponent } from './MapSumary.component';

const routes: Routes = [{ path: '', component: MapSumaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapSumaryRoutingModule { }
