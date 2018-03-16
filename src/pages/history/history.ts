import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthenticatedUser} from "../../models/user";
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Transaction} from "../../models/transaction";

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public  historisques : Array<Transaction> =[];
  public canload : boolean = true ;
  public page : number = 0 ;
  public length : number = 4 ;
  public start : number = 0 ;
  public total : number = 100 ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,private  Auth : AuthProvider) {
     this.doInfinite();
  }


  show(h:Transaction){
    h.show_details = !h.show_details;
  }


  doInfinite() {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.canload = this.page<this.total;
      if(this.canload){
        this.start = this.page*this.length;

        let p = {
          show_loading: false,
          start:this.start,
          length:this.length
        };
        this.page++;
        this.API.getRequest('historique',p).then(
          (data: any)=>{
            this.total = Math.ceil(data.message.recordsFiltered/this.length);
            //this.historisques = data.message.data;
            this.historisques = this.historisques.concat(data.message.data);
            console.log(this.total,this.page)
            resolve();
          },(err)=>{
            console.log(err)
            resolve();
          }
        )
      }


      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldePage');
  }

}
