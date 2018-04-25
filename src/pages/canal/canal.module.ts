import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanalPage } from './canal';
import {TranslateModule} from "@ngx-translate/core";
import {AutoCompleteModule} from "ionic2-auto-complete";
import {CompletServicesProvider} from "../../providers/complet-services/complet-services";
import {CompletCardsProvider} from "../../providers/complet-cards/complet-cards";

@NgModule({
  declarations: [
    CanalPage,

  ],
  imports: [
    TranslateModule,
    AutoCompleteModule,
    IonicPageModule.forChild(CanalPage),

  ],
  providers:[
    CompletServicesProvider,
    CompletCardsProvider
  ]
})
export class CanalPageModule {}
