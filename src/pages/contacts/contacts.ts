import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private  toast: ToastProvider,
              private _FB : FormBuilder,private _AUTH : AuthProvider, public api : ApiProvider) {
    this.contact_form = this._FB.group({
      'message'        : ['',Validators.compose([Validators.required,Validators.maxLength(160)])],
    });
  }

  send(){

    let b : any  = this.contact_form.controls['message'].value;

    this.api.postRequest('notification',{message:b}).then((data)=>{
      console.log(data)
      this.toast.success('message envoye !')
      this.contact_form.controls['message'].setValue('');
    },(err)=>{
      this.toast.error(err.message)
    })

  }
  clear(){
    this.contact_form.controls['message'].setValue('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
