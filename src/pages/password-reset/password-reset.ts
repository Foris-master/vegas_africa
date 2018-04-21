import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {ToastProvider} from "../../providers/toast/toast";
import { TranslateService } from '@ngx-translate/core';
import {PasswordValidation} from "../../validations/password_confirm";
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
  public new_form: FormGroup;
  public next: number = 0;
  public lg : string ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private _FB : FormBuilder,private _AUTH : AuthProvider,private  toast: ToastProvider,
              private translate: TranslateService,) {
    // Define FormGroup object using Angular's FormBuilder
    this.request_form = this._FB.group({
      'login': ['', Validators.required],
    });
    this.reset_form = this._FB.group({
      'code': ['', Validators.required],
    });
    this.new_form = this._FB.group({
      'mot_de_pass'     : ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      'mot_de_pass_confirm'  : ["", Validators.compose([]) ],
    },{
      validator: PasswordValidation.MatchPassword // your validation method
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  request() : void
  {
    this.lg= this.request_form.controls['login'].value;
    let data = {
      login : this.lg,
    };

    this._AUTH.request_reset(data)
      .then((auth : any) =>
      {

        this.translate.get("password_reset_pag.reset_send").subscribe(translated=>{
          this.toast.success(translated);
        });
        this.next= 1;
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
      login: this.lg
    };

    this._AUTH.reset(data)
      .then((auth : any) =>
      {

        this.next= 2;
        this.translate.get("password_reset_pag.code_ok").subscribe(translated=>{
          this.toast.success(translated);
        });
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        this.toast.error(error.message)

      });

  }

  newPass(){

    let np : any  = this.new_form.controls['mot_de_pass'].value;
    let data = {
      new_pass_word : np,
      login: this.lg
    };

    this._AUTH.reset(data)
      .then((auth : any) =>
      {

        this.next= 2;
        this.translate.get("password_reset_pag.reset_msg").subscribe(translated=>{
          this.toast.success(translated);
        });
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
