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
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,private  Auth : AuthProvider) {
      this.API.getRequest('solde').then(
        (data: any)=>{
          this.discount = parseFloat(data.message);
        },(err)=>{
          console.log(err)
        }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldePage');
  }

}
