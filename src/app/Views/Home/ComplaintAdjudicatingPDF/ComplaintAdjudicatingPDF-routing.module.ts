import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintAdjudicatingPDFComponent } from './ComplaintAdjudicatingPDF.component';

const routes: Routes = [{ path: '', component: ComplaintAdjudicatingPDFComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintAdjudicatingPDFRoutingModule { }
