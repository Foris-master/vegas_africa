import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientModalPage } from './client-modal';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ClientModalPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(ClientModalPage),
  ],
})
export class ClientModalPageModule {}
