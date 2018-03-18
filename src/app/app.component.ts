import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {HistoryPage} from "../pages/history/history";
import {ProfilePage} from "../pages/profile/profile";
import {ContactsPage} from "../pages/contacts/contacts";
import {SoldePage} from "../pages/solde/solde";
import {UserProvider} from "../providers/user/user";
import {AuthProvider} from "../providers/auth/auth";
import {AuthenticatedUser} from "../models/user";
import {CartesPage} from "../pages/cartes/cartes";
import {RegisterPage} from "../pages/register/register";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RegisterPage;
  public user: AuthenticatedUser= AuthenticatedUser.GetNewInstance();
  pages: Array<{title: string, component: any,icon?: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public userStorage: UserProvider,public auth: AuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Historique', component: HistoryPage , icon: "home"},
      { title: 'Solde', component: SoldePage,icon: "card" },
      { title: 'Clients', component: CartesPage,icon: "people" },
      { title: 'Profile', component: ProfilePage,icon: "person" },
      { title: 'Contacter', component: ContactsPage,icon: "help-circle" },
      { title: 'Deconnexion', component: LoginPage,icon: "log-out" },
    ];

    this.auth.getAuthUser().then((user)=>{
      this.user= user;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.userStorage.deleteOnStorage().then(()=>{
      this.nav.setRoot(page.component);
    },(err)=>{
      console.log(err)
    })
  }
}
