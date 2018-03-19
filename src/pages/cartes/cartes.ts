import { Component } from '@angular/core';
import {AlertController, IonicPage, Modal, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Carte} from "../../models/carte";
import {ToastProvider} from "../../providers/toast/toast";
import {ClientModalPage} from "../client-modal/client-modal";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the CartesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartes',
  templateUrl: 'cartes.html',
})
export class CartesPage {

  public  clients : Array<Carte> =[];
  public iscreation : boolean = true ;
  public sl : boolean = true ;
  public canload : boolean = true ;
  public page : number = 0 ;
  public length : number = 4 ;
  public start : number = 0 ;
  public total : number = 100 ;
  public login : string ;
  public cle_de_session : string ;
  public profileModal: Modal;
  public lmsg : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              private API: ApiProvider,private  Auth : AuthProvider,private  toast: ToastProvider,
              private translate: TranslateService,public modalCtrl: ModalController) {
    this.translate.get("client_pag.loading_message").subscribe(translated=>{
      this.lmsg=translated;
    });

    this.Auth.getAuthUser().then((u)=>{
      // console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      this.doInfinite();
    })
  }

  show(h:Carte){
    h.show_details = !h.show_details;
  }
  doInfinite() {
    return new Promise((resolve) => {
      this.canload = this.page<this.total;
      if(this.canload||true){
        this.start = this.page*this.length;
        let p = {
          show_loading: this.sl,
          start:this.start,
          length:this.length,
          login: this.login,
          cle_de_session: this.cle_de_session
        };
        this.page++;
        this.sl= false;
        this.API.getRequest('lister_client_info',p).then(
          (data: any)=>{
            console.log(data);
            this.total = Math.ceil(data.message.recordsFiltered/this.length);
            this.clients = this.clients.concat(data.message.data);
            // console.log(this.total,this.page)
            resolve();
          },(err)=>{
            console.log(err)
            resolve();
          }
        )
      }


    });


  }

  edit(c? : Carte){
    if(c==undefined){
      this.iscreation=true
    }else{
      this.iscreation= false;
    }
    this.presentModal(c);

  }

  del(c: Carte){

    let confirm = this.alertCtrl.create({
      title: 'Supprimer le client?',
      message: 'Vous allez supprimer le client de carte :'+c.num_carte,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
            this.toast.warning('Suppression annule !')

          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            let d = {
              login : this.login,
              cle_de_session : this.cle_de_session,
              ids_info_client : [c.id]
            }
            this.API.postRequest('delete_client_info',d).then((data)=>{
              console.log(data)
              this.toast.success('client supprime avec succes')
            });
          }
        }
      ]
    });
    confirm.present();
  }

  presentModal(c?: Carte) {
    this.profileModal = this.modalCtrl.create(ClientModalPage, { client: c ,login: this.login, cle_de_session:this.cle_de_session});
    this.profileModal.onDidDismiss(data => {
      console.log(data);
      if(data != undefined){
        if(this.iscreation){
          this.clients.unshift(data);
        }else{

          let updateItem = this.clients.find(this.findIndexToUpdate, data.id);

          let index = this.clients.indexOf(updateItem);


          this.clients[index] = data;
        }
      }


    });
    this.profileModal.present();
  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  dismissModal() {
    this.profileModal.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartesPage');
  }

}
