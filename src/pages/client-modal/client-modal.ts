import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {ToastProvider} from "../../providers/toast/toast";
import {Carte} from "../../models/carte";

/**
 * Generated class for the ClientModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(private navParams: NavParams, private view: ViewController, private _FB : FormBuilder,
              private  toast: ToastProvider, private API: ApiProvider) {
    this.carte_form = this._FB.group({
      'num_carte'        : ['', Validators.compose([Validators.required])],
      'telephone'     : ['', Validators.compose([Validators.required,Validators.minLength(9)])],
      'adresse'     : ['',Validators.compose([ Validators.required])],
      'ville'     : ['', Validators.compose([Validators.required])],
      'quartier'     : ['', Validators.compose([Validators.required])],

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
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
  }

  update(){

    let d: {login? , cle_de_session?,client_info: Array<any>} = {client_info:[]};
    d.login = this.login;
    d.cle_de_session = this.cle_de_session;
    let c = Carte.GetNewInstance();
    if(this.iscreation){
      c.id ="0";
    }else {
      c.id = this.client.id
    }
    c.num_carte =  this.carte_form.controls.num_carte.value,
    c.adresse =  this.carte_form.controls.adresse.value,
    c.telephone =  this.carte_form.controls.telephone.value,
    c.ville =  this.carte_form.controls.ville.value,
    c.quartier =  this.carte_form.controls.quartier.value,
    d.client_info = [c]

    this.API.postRequest('add_client_info',d).then((data)=>{
      console.log(data)
      this.toast.success('client supprime avec succes')
    },(err)=>{
      this.toast.error(err.message);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientModalPage');
  }

}
