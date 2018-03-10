import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {AuthProvider} from "../../providers/auth/auth";
import {RegisterPage} from "../register/register";
import {PasswordResetPage} from "../password-reset/password-reset";
import {ToastProvider} from "../../providers/toast/toast";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private _FB : FormBuilder,private _AUTH : AuthProvider,private  toast: ToastProvider) {
    // Define FormGroup object using Angular's FormBuilder
    this.login_form = this._FB.group({
      'login'        : ['', Validators.required],
      'password'     : ['', Validators.required]
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
        this.toast.success('vous etes en ligne')
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        this.toast.error(error.message)
      });
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  forgotten(){
    this.navCtrl.push(PasswordResetPage)
  }

}
