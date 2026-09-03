import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioJinglesRoutingModule } from './audio-jingles-routing-module';
import { AudioJingles } from './audio-jingles';


@NgModule({
  declarations: [
    AudioJingles
  ],
  imports: [
    CommonModule,
    AudioJinglesRoutingModule
  ]
})
export class AudioJinglesModule { }
