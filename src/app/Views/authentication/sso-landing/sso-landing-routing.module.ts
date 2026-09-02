import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsoLandingComponent } from './sso-landing.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [{ path: '', component: SsoLandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, NgScrollbarModule, MatToolbarModule],
  exports: [RouterModule, MatSelectModule, MatInputModule, MatFormFieldModule, NgScrollbarModule],
})
export class SsoLandingRoutingModule { }
