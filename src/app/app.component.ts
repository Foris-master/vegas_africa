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
import { TranslateService } from '@ngx-translate/core';
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  public user: AuthenticatedUser= AuthenticatedUser.GetNewInstance();
  pages: Array<{title: string, component: any,icon?: string,name?:string}>;
  public  isfrench : boolean = true;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public userStorage: UserProvider,public auth: AuthProvider,private translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home', component: HomePage , icon: "home",name:'home'},
      { title: 'history', component: HistoryPage , icon: "archive",name:'history'},
      { title: 'discount', component: SoldePage,icon: "card",name:'solde' },
      { title: 'cards', component: CartesPage,icon: "people" ,name:'cards'},
      { title: 'profile', component: ProfilePage,icon: "person",name:'profile' },
      { title: 'contact', component: ContactsPage,icon: "help-circle" ,name:'contacts'},
      { title: 'deconnexion', component: LoginPage,icon: "log-out" },
    ];
    platform.ready().then(() => {
      translate.addLangs(["fr", "en"]);
      translate.setDefaultLang('fr');

      let browserLang = translate.getBrowserLang();
      let bl = browserLang.match(/fr|en/);
      this.isfrench= browserLang.split("en").length <= 0;

      translate.use(bl ? browserLang : 'fr');
    });

    setTimeout(() => {
      this.auth.getAuthUser().then((user)=>{
        this.user= user;
      });
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  changeLanguage(){
    let l = this.isfrench ? 'fr' : 'en';
    this.translate.use(l);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=="deconnexion"){
      this.userStorage.deleteOnStorage().then(()=>{
        this.nav.setRoot(page.component);
      },(err)=>{
        console.log(err)
      })
    }else{
      this.nav.setRoot(page.name);
      // this.nav.setRoot(page.component);
    }

  }
}
