import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialModificationProfileSummaryWebSiteComponent } from './special-modification-profile-summary-web-site.component';

const routes: Routes = [{ path: '', component: SpecialModificationProfileSummaryWebSiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialModificationProfileSummaryWebSiteRoutingModule { }
