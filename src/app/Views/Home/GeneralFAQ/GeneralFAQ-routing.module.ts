import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralFAQComponent } from './GeneralFAQ.component';

const routes: Routes = [{ path: '', component: GeneralFAQComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralFAQRoutingModule { }
