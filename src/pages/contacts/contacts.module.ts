import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './contacts';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(ContactsPage),
  ],
})
export class ContactsPageModule {}
