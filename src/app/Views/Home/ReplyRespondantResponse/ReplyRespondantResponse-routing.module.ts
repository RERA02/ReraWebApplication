import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplyRespondantResponseComponent } from './ReplyRespondantResponse.component';

const routes: Routes = [{ path: '', component: ReplyRespondantResponseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplyRespondantResponseRoutingModule { }
