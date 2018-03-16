import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {


  public request_form: FormGroup;
  public reset_form: FormGroup;
  public next: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private _FB : FormBuilder,private _AUTH : AuthProvider,private  toast: ToastProvider) {
    // Define FormGroup object using Angular's FormBuilder
    this.request_form = this._FB.group({
      'login': ['', Validators.required],
    });
    this.reset_form = this._FB.group({
      'code': ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  request() : void
  {
    let login : any  = this.request_form.controls['login'].value;
    let data = {
      login : login,
    };

    this._AUTH.request_reset(data)
      .then((auth : any) =>
      {
        this.toast.success("Code de renitialisation envoye !")
        this.next= true;
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        this.toast.error(error.message)

      });

  }
  reset() : void
  {
    let code : any  = this.reset_form.controls['code'].value;
    let data = {
      code : code,
    };

    this._AUTH.reset(data)
      .then((auth : any) =>
      {
        this.toast.success("Mot de passe reinitialise")
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        this.toast.error(error.message)

      });

  }

  login(){

    this.navCtrl.pop()
  }

}
