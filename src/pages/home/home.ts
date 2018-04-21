import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Service} from "../../models/service";
import {CanalPage} from "../canal/canal";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'home',
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public login : string ;
  public cle_de_session : string ;
  public services : Array<Service>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,private  Auth : AuthProvider) {
    this.Auth.getAuthUser().then((u)=>{
      console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      let p = {
        login: this.login,
        cle_de_session: this.cle_de_session,
      };
      this.API.getRequest('service',p).then(
        (data: any)=>{
          this.services = data.message;
        },(err)=>{
          console.log(err)
        }
      )
    })
  }

  openService(event:any,s:Service){
    console.log(s)
    if(s.code=='cp')
    this.navCtrl.push('canal',{service_id:s.id})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
