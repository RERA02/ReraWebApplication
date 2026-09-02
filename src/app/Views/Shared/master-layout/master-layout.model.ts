import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLayoutComponent } from './master-layout.component';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule, MaterialModule, FormsModule, NgScrollbarModule, NgbModule],
  exports: [RouterModule, MaterialModule, NgScrollbarModule],
})
export class MasterLayout { }
