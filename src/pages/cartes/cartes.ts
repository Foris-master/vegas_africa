import { Component } from '@angular/core';
import {AlertController, IonicPage, Modal, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Carte} from "../../models/carte";
import {ToastProvider} from "../../providers/toast/toast";
import {ClientModalPage} from "../client-modal/client-modal";
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the CartesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'cards',
})
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
  public added_card : number=0;
  public profileModal: Modal;
  public lang: {mtitle:string,mmsg:string,mcancel:string,mcancelm:string,mdel:string};
  public lmsg : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              private API: ApiProvider,private  Auth : AuthProvider,private  toast: ToastProvider,
              private translate: TranslateService,public modalCtrl: ModalController) {

    this.loadLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      this.loadLang();
    });

    this.Auth.getAuthUser().then((u)=>{
      // console.log(u);
      this.login=u.email;
      this.cle_de_session= u.cle_de_session;
      this.doInfinite();
    })
  }

  loadLang(){
    this.translate.get([
      "client_pag.loading_message",
      "client_pag.confirm_title",
      "client_pag.confirm_message",
      "client_pag.confirm_cancel",
      "client_pag.confirm_cancel_message",
      "client_pag.confirm_delete",
    ]).subscribe(translated=>{
      // console.log(translated);
      this.lmsg=translated["client_pag.loading_message"];
      this.lang={
        mtitle : translated["client_pag.confirm_title"],
        mmsg : translated["client_pag.confirm_message"],
        mcancel : translated["client_pag.confirm_cancel"],
        mcancelm : translated["client_pag.confirm_cancel_message"],
        mdel : translated["client_pag.confirm_delete"],
      };
    });
  }
  show(h:Carte){
    h.show_details = !h.show_details;
  }
  doInfinite() {
    return new Promise((resolve) => {
      this.canload = this.page<this.total;
      if(this.canload||true){
        this.start = this.page*this.length+this.added_card;
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
            // console.log(data);
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
      title: this.lang.mtitle,
      message: this.lang.mmsg+c.num_carte,
      buttons: [
        {
          text: this.lang.mcancel,
          handler: () => {
            // console.log('Disagree clicked');
            this.toast.warning(this.lang.mcancelm)

          }
        },
        {
          text: 'Ok',
          handler: () => {
            // console.log('Agree clicked');
            let d = {
              login : this.login,
              cle_de_session : this.cle_de_session,
              ids_info_client : [c.id]
            }
            this.API.postRequest('delete_client_info',d).then((data)=>{
              // console.log(data)
              let updateItem = this.clients.find(this.findIndexToUpdate, c.id);
              let index = this.clients.indexOf(updateItem);
              this.clients.splice(index, 1);
              this.added_card--;
              this.toast.success(this.lang.mdel)
            },(err)=>{
              this.toast.error(err.message)
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
      // console.log(data);
      if(data != undefined){
        if(this.iscreation){
          this.added_card++;
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
