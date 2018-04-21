import { Component } from '@angular/core';
import {IonicPage, Modal, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {AuthenticatedUser} from "../../models/user";
import {ApplePayOptions, Braintree, PaymentUIOptions, PaymentUIResult} from "@ionic-native/braintree";
import {TranslateService} from "@ngx-translate/core";
import {ProceedPaymentPage} from "../proceed-payment/proceed-payment";

/**
 * Generated class for the SoldePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'solde',
})
@Component({
  selector: 'page-solde',
  templateUrl: 'solde.html',
})


export class SoldePage {

  private  discount:any={};
  public login : string ;
  public payment_methods: Array<any>;
  public cle_de_session : string ;
  public selectedIndex:number=0;
  public accounts:any;
  public proceedModal: Modal;
  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider,private  Auth : AuthProvider,
              private braintree: Braintree,private translate: TranslateService,public modalCtrl: ModalController) {
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
          this.discount = data.message;
        },(err)=>{
          console.log(err)
        }
      )
      this.payment_methods =[
        {name:'cap',label:"cardp",logo:'cap.png'},
        {name:'or',label:"orange",logo:'or.png'},
        {name:'mtn',label:"mtn",logo:'mtn.png'},
        {name:'exp',label:"express",logo:'exp.png'},
      ];
      this.API.getRequest('account',p).then(
        (data: any)=>{
          this.accounts = data.message;
        },(err)=>{
          console.log(err)
        }
      )
    })

  }

  cardPayment(){
    const BRAINTREE_TOKEN = '<YOUR_BRAINTREE_TOKEN>';

// NOTE: Do not provide this unless you have configured your Apple Developer account
// as well as your Braintree merchant account, otherwise the Braintree module will fail.
    /*const appleOptions: ApplePayOptions = {
      merchantId: '<YOUR MERCHANT ID>',
      currency: 'USD',
      country: 'US'
    };
*/
    const paymentOptions: PaymentUIOptions = {
      amount: '14.99',
      primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    };

    this.braintree.initialize(BRAINTREE_TOKEN)
      /*.then(() => this.braintree.setupApplePay(appleOptions))*/
      .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
      .then((result: PaymentUIResult) => {
        if (result.userCancelled) {
          console.log("User cancelled payment dialog.");
        } else {
          console.log("User successfully completed payment!");
          console.log("Payment Nonce: " + result.nonce);
          console.log("Payment Result.", result);
        }
      })
      .catch((error: string) => console.error(error));
  }

  proceed(evt,p){
    if(p=='cap'){
      this.cardPayment();
    }else {
      let t ;
      if(p=='or'){
        t=this.accounts.orange;
      }else if(p=='mtn'){
        t=this.accounts.mtn;
      }else if(p=='exp'){
        t=this.accounts.express_union;
      }
      this.presentModal(p,t)
    }
  }
  goTo(index : number){
    this.selectedIndex = index;
  }

  presentModal(p:string,tel) {
    this.proceedModal = this.modalCtrl.create(ProceedPaymentPage, { method: p,tel:tel,login: this.login, cle_de_session:this.cle_de_session });
    this.proceedModal.onDidDismiss(data => {
      // console.log(data);
      if(data != undefined){

          console.log('ok');
      }


    });
    this.proceedModal.present();
  }



  dismissModal() {
    this.proceedModal.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldePage');
  }

}
