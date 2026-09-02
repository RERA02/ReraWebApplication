import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ProjectExtensionViewRoutingModule } from './ProjectExtensionView-routing.module';
import { ProjectExtensionViewComponent } from './ProjectExtensionView.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEnIn from '@angular/common/locales/en-IN';
registerLocaleData(localeEnIn);
@NgModule({
  declarations: [
    ProjectExtensionViewComponent
  ],
  imports: [
    CommonModule,
    ProjectExtensionViewRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class ProjectExtensionViewModule {
  
}
