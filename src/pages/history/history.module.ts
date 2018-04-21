import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
