import { NgModule } from '@angular/core';
import { MasterLayoutComponent } from './master-layout.component';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [RouterModule, MaterialModule, FormsModule, NgScrollbarModule, HighchartsChartModule],
  exports: [RouterModule, MaterialModule, NgScrollbarModule, HighchartsChartModule],
})
export class MasterLayoutModule { }
