import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartesPage } from './cartes';

@NgModule({
  declarations: [
    CartesPage,
  ],
  imports: [
    IonicPageModule.forChild(CartesPage),
  ],
})
export class CartesPageModule {}
