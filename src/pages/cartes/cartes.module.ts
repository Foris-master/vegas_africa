import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartesPage } from './cartes';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CartesPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(CartesPage),
  ],
})
export class CartesPageModule {}
