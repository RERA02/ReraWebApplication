import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioJingles } from './audio-jingles';

const routes: Routes = [{ path: '', component: AudioJingles }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioJinglesRoutingModule { }
