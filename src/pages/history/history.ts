import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Transaction} from "../../models/transaction";
import {AuthenticatedUser} from "../../models/user";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'history',
})
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public  historisques : Array<Transaction> =[];
  public login : string ;
  public cle_de_session : string ;
  public canload : boolean = true ;
  public sl : boolean = true ;
  public page : number = 0 ;
  public length : number = 4 ;
  public start : number = 0 ;
  public total : number = 100 ;
  public lmsg : string;
  public ph : Promise<void>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,
              private translate: TranslateService,private  Auth : AuthProvider) {
    this.translate.get("history_pag.loading_message").subscribe(translated=>{
      this.lmsg=translated;
    });
    this.ph= this.Auth.getAuthUser().then((u)=>{
      // console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      this.doInfinite();

    })

  }


  show(h:Transaction){
    h.show_details = !h.show_details;
  }


  doInfinite() {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.ph.then(()=>{
        this.canload = this.page<this.total;
        if(this.canload){
          this.start = this.page*this.length;
          let p = {
            show_loading: this.sl,
            start:this.start,
            login: this.login,
            cle_de_session: this.cle_de_session,
            length:this.length
          };
          this.sl= false;
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
      })


      });

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SoldePage');
  }

}
