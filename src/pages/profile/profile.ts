import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AuthenticatedUser} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../validations/password_confirm";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public  user : AuthenticatedUser;
  public profile_form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB : FormBuilder,
              public auth: AuthProvider, public api : ApiProvider,private  toast: ToastProvider) {
    this.user= AuthenticatedUser.GetNewInstance();
    this.profile_form = this._FB.group({
      'nom_prenom'        : ['', Validators.compose([Validators.required])],
      'num_tel'     : ['', Validators.compose([Validators.required,Validators.minLength(9)])],
      'email'     : ['',Validators.compose([ Validators.required,Validators.email])],
      'ville'     : ['', Validators.compose([Validators.required])],
      'mot_de_pass'     : ["", Validators.compose([])],
      'mot_de_pass_confirm'  : ["", Validators.compose([]) ],

    },{
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.auth.getAuthUser().then((user)=>{
      this.user = user;
      this.profile_form.controls.nom_prenom.setValue(this.user.nom_prenom)
      this.profile_form.controls.num_tel.setValue(this.user.num_tel)
      this.profile_form.controls.email.setValue(this.user.email)
      this.profile_form.controls.ville.setValue(this.user.ville)
      this.profile_form.controls.mot_de_pass.setValue(this.user.mot_de_pass)
    });

  }

  update(){
    let d      ={
      nom_prenom : this.profile_form.controls['nom_prenom'].value,
      email : this.profile_form.controls['email'].value,
      ville : this.profile_form.controls['ville'].value,
      num_tel : this.profile_form.controls['num_tel'].value,
    };
    let p = this.profile_form.controls['mot_de_pass'].value;
    let k = p&&p!="";
    if(k){
      d["mot_de_pass"] = p;
    }

    this.api.postRequest('modification',d).then((data)=>{
      console.log(data)
      this.toast.success('profile mis a jour!')
      if(k){
        this.profile_form.controls['mot_de_pass'].setValue(null);
        this.profile_form.controls['mot_de_pass_confirm'].setValue(null);
      }
    },(err)=>{
      this.toast.error(err.message)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
