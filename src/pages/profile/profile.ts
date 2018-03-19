import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AuthenticatedUser} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../validations/password_confirm";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";
import { TranslateService } from '@ngx-translate/core';
import {UserProvider} from "../../providers/user/user";
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
  public login : string;
  public cle_de_session : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB : FormBuilder, private translate: TranslateService,
              public auth: AuthProvider, public api : ApiProvider,private  toast: ToastProvider,private userService: UserProvider) {
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
      this.login=user.email
      this.cle_de_session=user.cle_de_session
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
      login: this.login,
      cle_de_session: this.cle_de_session
    };
    let p = this.profile_form.controls['mot_de_pass'].value;
    let k = p&&p!="";
    if(k){
      d["mot_de_pass"] = p;
    }
    this.api.postRequest('modification',d).then((dat:any)=>{
      console.log(dat)

      this.user = AuthenticatedUser.ParseFromObject(JSON.parse(dat.message));
      this.userService.createOnStorage(this.user).then((d)=>{
        console.log(d);
      });

      this.translate.get("profile_pag.updated").subscribe(translated=>{
        this.toast.success(translated);
      });
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
