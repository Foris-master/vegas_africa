import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {AuthenticatedUser} from "../../models/user";

/**
 * Generated class for the SoldePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solde',
  templateUrl: 'solde.html',
})


export class SoldePage {

  private  discount : number;
  public login : string ;
  public cle_de_session : string ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,private  Auth : AuthProvider) {
    this.Auth.getAuthUser().then((u)=>{
       console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      let p = {
        login: this.login,
        cle_de_session: this.cle_de_session,
      };
      this.API.getRequest('solde',p).then(
        (data: any)=>{
          this.discount = parseFloat(data.message);
        },(err)=>{
          console.log(err)
        }
      )
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldePage');
  }

}
