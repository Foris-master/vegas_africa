import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  public contact_form: FormGroup;
  public login : string ;
  public cle_de_session : string ;
  public services : Array<any> ;

  constructor(public navCtrl: NavController, public navParams: NavParams,private  toast: ToastProvider,  private translate: TranslateService,
              private _FB : FormBuilder,private _AUTH : AuthProvider, public api : ApiProvider,private  Auth : AuthProvider) {
    this.contact_form = this._FB.group({
      'service'        : ['',Validators.compose([Validators.required])],
      'message'        : ['',Validators.compose([Validators.required,Validators.maxLength(160)])],
    });
    this.Auth.getAuthUser().then((u)=>{
      console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      let p = {
        login: this.login,
        cle_de_session: this.cle_de_session,
      };
      this.api.getRequest('service',p).then(
        (data: any)=>{
          console.log(data);
          this.services = data.message;
        },(err)=>{
          console.log(err)
        }
      )
    })
  }

  send(){

    let p = {
      login: this.login,
      cle_de_session: this.cle_de_session,
      service:this.contact_form.controls['service'].value,
      message:this.contact_form.controls['message'].value
    };

    this.api.postRequest('notification',p).then((data)=>{
      console.log(data)
      this.translate.get("contact_pag.msg_send").subscribe(translated=>{
        this.toast.success(translated);
      });
      this.contact_form.controls['message'].setValue('');
    },(err)=>{
      this.toast.error(err.message)
    })

  }
  clear(){
    this.contact_form.controls['service'].setValue(null);
    this.contact_form.controls['message'].setValue('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
