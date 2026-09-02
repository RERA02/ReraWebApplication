import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialModificationProfileSummaryWebSiteRoutingModule } from './special-modification-profile-summary-web-site-routing.module';
import { SpecialModificationProfileSummaryWebSiteComponent } from './special-modification-profile-summary-web-site.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpecialModificationProfileSummaryWebSiteComponent
  ],
  imports: [
    CommonModule,
    SpecialModificationProfileSummaryWebSiteRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class SpecialModificationProfileSummaryWebSiteModule { }
