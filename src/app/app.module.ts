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
import { TranslateModule ,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from '@ngx-translate/core';
import {HomePage} from "../pages/home/home";
import {CanalPage} from "../pages/canal/canal";
import {AutoCompleteModule} from "ionic2-auto-complete";
import {HomePageModule} from "../pages/home/home.module";
import {CanalPageModule} from "../pages/canal/canal.module";
import {HistoryPageModule} from "../pages/history/history.module";
import {ContactsPageModule} from "../pages/contacts/contacts.module";
import {SoldePageModule} from "../pages/solde/solde.module";
import {CartesPageModule} from "../pages/cartes/cartes.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {ClientModalPageModule} from "../pages/client-modal/client-modal.module";
import {Braintree} from "@ionic-native/braintree";
import {ProceedPaymentPage} from "../pages/proceed-payment/proceed-payment";
import { CompletServicesProvider } from '../providers/complet-services/complet-services';
import { CompletCardsProvider } from '../providers/complet-cards/complet-cards';
import {LoginPageModule} from "../pages/login/login.module";
import {PasswordResetPageModule} from "../pages/password-reset/password-reset.module";
import {ProceedPaymentPageModule} from "../pages/proceed-payment/proceed-payment.module";
import {RegisterPageModule} from "../pages/register/register.module";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    MyApp
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RegisterPageModule,
    PasswordResetPageModule,
    ProceedPaymentPageModule,
    LoginPageModule,
    AutoCompleteModule,
    HomePageModule,
    CanalPageModule,
    HistoryPageModule,
    ContactsPageModule,
    SoldePageModule,
    CartesPageModule,
    ClientModalPageModule,
    ProfilePageModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    ClientModalPage,
    HomePage,
    CanalPage,
    ProceedPaymentPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    Braintree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    httpInterceptorProviders,
        AuthProvider,
    ToastProvider,
    ApiProvider,
    UserProvider,
    TranslateService,
    CompletServicesProvider,
    CompletCardsProvider
  ]

})
export class AppModule {}
