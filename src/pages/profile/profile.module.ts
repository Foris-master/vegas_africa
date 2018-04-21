import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
