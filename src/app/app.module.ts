import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PasswordResetPage } from '../pages/password-reset/password-reset';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClient, HttpClientModule} from "@angular/common/http";
import {ToastProvider} from "../providers/toast/toast";
// import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {ProfilePage} from "../pages/profile/profile";
import {HistoryPage} from "../pages/history/history";
import {ContactsPage} from "../pages/contacts/contacts";
import {SoldePage} from "../pages/solde/solde";
import { ApiProvider } from '../providers/api/api';
import { UserProvider } from '../providers/user/user';
import {IonicStorageModule} from "@ionic/Storage";
import {httpInterceptorProviders} from "../interceptors/index";
import {CartesPage} from "../pages/cartes/cartes";
import {ClientModalPage} from "../pages/client-modal/client-modal";




@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    LoginPage,
    PasswordResetPage,
    ProfilePage,
    HistoryPage,
    ContactsPage,
    SoldePage,
    CartesPage,
    ClientModalPage
  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

    IonicStorageModule.forRoot({
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    PasswordResetPage,
    ProfilePage,
    HistoryPage,
    ContactsPage,
    SoldePage,
    CartesPage,
    ClientModalPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    httpInterceptorProviders,
        AuthProvider,
    ToastProvider,
    ApiProvider,
    UserProvider
  ]

})
export class AppModule {}
