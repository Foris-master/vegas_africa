import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientModalPage } from './client-modal';

@NgModule({
  declarations: [
    ClientModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientModalPage),
  ],
})
export class ClientModalPageModule {}
