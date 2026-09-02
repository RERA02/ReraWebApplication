import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginProcessComponent } from './LoginProcess.component';

const routes: Routes = [{ path: '', component: LoginProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginProcessRoutingModule { }
