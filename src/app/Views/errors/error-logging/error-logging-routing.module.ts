import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorLoggingComponent } from './error-logging.component';

const routes: Routes = [{ path: '', component: ErrorLoggingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorLoggingRoutingModule { }
