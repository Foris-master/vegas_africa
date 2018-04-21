import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {ApiProvider} from "../../providers/api/api";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ProceedPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proceed-payment',
  templateUrl: 'proceed-payment.html',
})
export class ProceedPaymentPage {


  public  login : string ;
  public  cle_de_session : string ;
  public  tel : string ;
  public  method : string ;
  public  iscreation : boolean ;
  public proceed_form: FormGroup;
  public lang : {refill:string};

  constructor(private navParams: NavParams, private view: ViewController, private _FB : FormBuilder,
              private  toast: ToastProvider, private API: ApiProvider, private translate: TranslateService,) {
    this.proceed_form = this._FB.group({
      'message'        : ['', Validators.compose([Validators.required])],
      'montant'     : ['',Validators.compose([ Validators.required])],
      'numero'     : ['', Validators.compose([Validators.required])],
    });

    this.loadLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      this.loadLang();
    });
  }

  loadLang(){
    this.translate.get([
      "proceed_modal_pag.refill_message",
    ]).subscribe(translated=>{
      this.lang={
        refill : translated["proceed_modal_pag.refill_message"]
      };
    });
  }

  ionViewWillLoad() {
    console.log(this);
    this.tel = this.navParams.get('tel');
    this.method = this.navParams.get('method');
    this.login = this.navParams.get('login');
    this.cle_de_session = this.navParams.get('cle_de_session');
    console.log(this.login)
    this.iscreation= false;
    this.proceed_form.controls.numero.setValue(this.tel)



  }

  closeModal() {
    /* const data = {
       name: 'John Doe',
       occupation: 'Milkman'
     };*/
    this.view.dismiss();
  }

  refill(){
    let p ={
      login:this.login,
      cle_de_session:this.cle_de_session,
      numero:this.tel,
      montant:this.proceed_form.controls.montant.value,
      message:this.proceed_form.controls.message.value
    }

    this.API.postRequest('recharge_solde',p).then((data:{message?:any})=>{
      console.log(data)
      console.log(this.lang.refill)
      this.toast.success(this.lang.refill)
      this.view.dismiss(data);

    },(err)=>{
      this.toast.error(err.message);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientModalPage');
  }

}
