import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldePage } from './solde';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SoldePage,
  ],
  imports: [
    IonicPageModule.forChild(SoldePage),
    TranslateModule.forChild(),
  ],
})
export class SoldePageModule {}
