import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public register_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private _FB : FormBuilder,private _AUTH : AuthProvider,private  toast: ToastProvider) {
    this.register_form = this._FB.group({
      'name'        : ['', Validators.required],
      'tel'     : ['', Validators.required],
      'email'     : ['', Validators.required],
      'cni'     : ['', Validators.required],
      'town'     : ['', Validators.required],
      'password'     : ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register() : void
  {
    let d      ={
      nom_prenom : this.register_form.controls['name'].value,
      email : this.register_form.controls['email'].value,
      ville : this.register_form.controls['town'].value,
      num_carte : this.register_form.controls['cni'].value,
      num_tel : this.register_form.controls['tel'].value,
      mot_de_pass : this.register_form.controls['password'].value,
    };


    this._AUTH.register(d)
      .then((auth : any) =>
      {
        this.toast.success("compte cree avec sucess");
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error : any) =>
      {
        console.log(error.message);
        this.toast.error(error.message)
      });

  }
  login(){
    this.navCtrl.pop();
  }


}
