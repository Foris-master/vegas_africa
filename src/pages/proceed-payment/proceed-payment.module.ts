import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProceedPaymentPage } from './proceed-payment';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProceedPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(ProceedPaymentPage),
    TranslateModule.forChild(),
  ],
})
export class ProceedPaymentPageModule {}
