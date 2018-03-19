import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {RegisterPage} from "../register/register";
import {PasswordResetPage} from "../password-reset/password-reset";
import {ToastProvider} from "../../providers/toast/toast";
import {HistoryPage} from "../history/history";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public login_form: FormGroup;
  public  isfrench : boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private _FB : FormBuilder,private _AUTH : AuthProvider,private  toast: ToastProvider,
              private translate: TranslateService,public platform: Platform) {
    // Define FormGroup object using Angular's FormBuilder
    this.login_form = this._FB.group({
      'login'        : ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'password'     : ['', Validators.compose([Validators.required,Validators.minLength(4)])]
    });
    platform.ready().then(() => {

      translate.addLangs(["fr", "en"]);
      translate.setDefaultLang('fr');

      let browserLang = translate.getBrowserLang();
      let bl = browserLang.match(/fr|en/);
      this.isfrench= browserLang.split("en").length <= 0;

      translate.use(bl ? browserLang : 'fr');
    });
    this._AUTH.isAuthenticated().then((b)=>{
      if(b){
        this.navCtrl.setRoot(HistoryPage);
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  changeLanguage(){
    let l = this.isfrench ? 'fr' : 'en';
    this.translate.use(l);
  }

  logIn() : void
  {
    let login : any  = this.login_form.controls['login'].value,
      password   : any  = this.login_form.controls['password'].value;
    let data = {
      login : login,
      mot_de_pass : password
    };

    this._AUTH.login(data)
      .then((auth : any) =>
      {
        this.translate.get("login_pag.online").subscribe(translated=>{
          this.toast.success(translated);
        });

        this.navCtrl.setRoot(HistoryPage);
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        if(error.code=="108"){
          this.translate.get("login_pag.bad_credentials").subscribe(translated=>{
            this.toast.error(translated);
          });
        }else if(error.code=="201"){
          this.translate.get("login_pag.invalid_params").subscribe(translated=>{
            this.toast.error(translated);
          });
        }else{
          this.toast.error(error.message)
        }
      });
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  forgotten(){
    this.navCtrl.push(PasswordResetPage)
  }

}
