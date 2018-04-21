import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";
import {Carte} from "../../models/carte";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ClientModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'client-modal',
})
@Component({
  selector: 'page-client-modal',
  templateUrl: 'client-modal.html',
})
export class ClientModalPage {

  public  client : Carte ;
  public  login : string ;
  public  cle_de_session : string ;
  public  iscreation : boolean ;
  public carte_form: FormGroup;
  public lang : {create:string,update:string};

  constructor(private navParams: NavParams, private view: ViewController, private _FB : FormBuilder,
              private  toast: ToastProvider, private API: ApiProvider, private translate: TranslateService,) {
    this.carte_form = this._FB.group({
      'num_carte'        : ['', Validators.compose([Validators.required])],
      'telephone'     : ['', Validators.compose([Validators.required,Validators.minLength(9)])],
      'adresse'     : ['',Validators.compose([ Validators.required])],
      'ville'     : ['', Validators.compose([Validators.required])],
      'quartier'     : ['', Validators.compose([Validators.required])],

    });

    this.loadLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      this.loadLang();
    });
  }

  loadLang(){
    this.translate.get([
      "client_modal_pag.create_message",
      "client_modal_pag.update_message",
    ]).subscribe(translated=>{
      this.lang={
        create : translated["client_pag.create_message"],
        update : translated["client_pag.update_message"],
      };
    });
  }

  ionViewWillLoad() {
    console.log(this);
    this.client = this.navParams.get('client');
    this.login = this.navParams.get('login');
    this.cle_de_session = this.navParams.get('cle_de_session');
    if(this.client == undefined){
      this.iscreation = true
    }else{
      this.iscreation= false;
      this.carte_form.controls.num_carte.setValue(this.client.num_carte)
      this.carte_form.controls.adresse.setValue(this.client.adresse)
      this.carte_form.controls.telephone.setValue(this.client.telephone)
      this.carte_form.controls.ville.setValue(this.client.ville)
      this.carte_form.controls.quartier.setValue(this.client.quartier)

    }

  }

  closeModal() {
   /* const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };*/
    this.view.dismiss();
  }

  update(){

    let d: {login? , cle_de_session?,info_client: Array<any>} = {info_client:[]};
    d.login = this.login;
    d.cle_de_session = this.cle_de_session;
    let c = Carte.GetNewInstance();
    if(this.iscreation){
      c.id ="0";
    }else {
      c.id = this.client.id
    }
    console.log(c)
    c.num_carte =  this.carte_form.controls.num_carte.value,
    c.adresse =  this.carte_form.controls.adresse.value,
    c.telephone =  this.carte_form.controls.telephone.value,
    c.ville =  this.carte_form.controls.ville.value,
    c.quartier =  this.carte_form.controls.quartier.value,
    d.info_client = [c]
    this.API.postRequest('add_client_info',d).then((data:{message?:any})=>{
      console.log(data)
      let c = Carte.ParseFromObject(data.message[0]);

      this.view.dismiss(c);
      if(this.iscreation){
        this.toast.success(this.lang.create)
      }else {
        this.toast.success(this.lang.update)
      }
    },(err)=>{
      this.toast.error(err.message);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientModalPage');
  }

}
