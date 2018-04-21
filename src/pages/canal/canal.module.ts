import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanalPage } from './canal';
import {TranslateModule} from "@ngx-translate/core";
import {AutoCompleteModule} from "ionic2-auto-complete";

@NgModule({
  declarations: [
    CanalPage,

  ],
  imports: [
    TranslateModule,
    AutoCompleteModule,
    IonicPageModule.forChild(CanalPage),

  ],
})
export class CanalPageModule {}
