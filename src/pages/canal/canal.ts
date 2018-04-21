import { Component } from '@angular/core';
import {AlertController, IonicPage, Modal, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Service} from "../../models/service";
import {Carte} from "../../models/carte";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientModalPage} from "../client-modal/client-modal";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ToastProvider} from "../../providers/toast/toast";


/**
 * Generated class for the CanalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'canal',
  segment:'canal/:service_id'
})

@Component({
  selector: 'page-canal',
  templateUrl: 'canal.html',
})
export class CanalPage {
  public login : string ;
  public cle_de_session : string ;
  public tools : Array<number>=[];
  public services : Array<string>;
  public selectedIndex:number=0;
  public  cards : Array<Carte> =[];
  public  kits : Array<any> =[];
  public  types : Array<any> =[];
  public  accessoires : Array<any> =[];
  public souscription_form: FormGroup;
  public profileModal: Modal;
  public tool_msg:string;
  public tool_meta:{amount:number,concern:string,msg?:string}={amount:0,concern:""};
  public lang: {mtitle:string,mmsg:string,mcancel:string,mcancelm:string,mdel:string,btitle:string,bmsg:string};

  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider, private _FB : FormBuilder
              ,private  Auth : AuthProvider,public modalCtrl: ModalController,public alertCtrl: AlertController,
              private translate: TranslateService,private  toast: ToastProvider) {

    this.loadLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      this.loadLang();
    });

    this.Auth.getAuthUser().then((u)=>{
      this.login=u.num_tel;
      this.cle_de_session= u.cle_de_session;
      let p = {
        login: this.login,
        cle_de_session: this.cle_de_session,
        service_id:this.navParams.get("service_id")
      };

      this.API.getRequest('sous_service',p).then(
        (data: any)=>{
          this.services = data.message;
        },(err)=>{
          console.log(err)
        }
      )

      this.API.getRequest('accessoires',p).then(
        (data: any)=>{
          this.accessoires = data.message;
        },(err)=>{
          console.log(err)
        }
      )
      this.API.getRequest('les_kits',p).then(
        (data: any)=>{
          this.kits = data.message;
        },(err)=>{
          console.log(err)
        }
      )
      this.API.getRequest('type_installation',p).then(
        (data: any)=>{
          this.types = data.message;
        },(err)=>{
          console.log(err)
        }
      )

      let k = {
        show_loading: true,
        start: 0,
        length: 300,
        login: this.login,
        cle_de_session: this.cle_de_session
      };
      this.API.getRequest('lister_client_info', k).then(
        (data: any) => {
          // console.log(data);
          this.cards = data.message.data;
          // console.log(this.total,this.page)
        }, (err) => {
          console.log(err)
        }
      )
    })

    this.souscription_form = this._FB.group({
      'kit'        : ['', Validators.compose([Validators.required])],
      'type'        : ['', Validators.compose([Validators.required])],
      'adresse'     : ['',Validators.compose([ Validators.required])],
      'ville'     : ['', Validators.compose([Validators.required])],
      'quartier'     : ['', Validators.compose([Validators.required])],

    });

  }

  goTo(index : number){
    this.selectedIndex = index;
  }

  loadLang(){
    this.translate.get([
      "canal_pag.confirm_title",
      "canal_pag.confirm_message",
      "canal_pag.confirm_cancel",
      "canal_pag.confirm_cancel_message",
      "canal_pag.confirm",
      "canal_pag.summary_title",
      "canal_pag.summary_msg"
    ]).subscribe(translated=>{
      // console.log(translated);
      this.lang={
        mtitle : translated["canal_pag.confirm_title"],
        mmsg : translated["canal_pag.confirm_message"],
        mcancel : translated["canal_pag.confirm_cancel"],
        mcancelm : translated["canal_pag.confirm_cancel_message"],
        mdel : translated["canal_pag.confirm"],
        btitle:translated["canal_pag.summary_title"],
        bmsg:translated["canal_pag.summary_msg"]
      };
    });
  }

  showDetails(event,s){
      s.show_details= true;
  }

  cancelSubcribe(evt,s){
    s.show_details=false;
    evt.stopPropagation();
  }

  reSubcribe(evt,s){
    this.bilan({amount:s.montant,concern:s.nom,msg:s.nom},'resubcribe',s)
    evt.stopPropagation();
  }

  subcribe(evt){
    let p= {
      kit:this.souscription_form.controls.kit.value,
      type:this.souscription_form.controls.type.value,
      adresse:this.souscription_form.controls.adresse.value,
      ville:this.souscription_form.controls.ville.value,
      quartier:this.souscription_form.controls.quartier.value,
      login: this.login,
      cle_de_session: this.cle_de_session,
    }
    let ko = this.kits.find(this.findIndexToUpdate,p.kit);
    let to = this.types.find(this.findIndexToUpdate,p.type);
    let am =0 ;
    let con="";
    con+=ko.nom;
    con+=" | ";
    con+=to.nom;
    am+=parseFloat(ko.montant);
    am+=parseFloat(to.montant);
   this.bilan({msg:'vous souscripte au service',amount:am,concern:con},'subcribe',p)
    evt.stopPropagation();
  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
  onChange(s:any, isChecked) {
    if(isChecked) {
      this.tools.push(s.id)
      this.tool_meta.amount=this.tool_meta.amount+parseInt(s.montant)
      this.tool_meta.concern+=s.nom+";"
    } else {
      let idx = this.tools.findIndex(x => x == s.id)
      //this.tools.removeAt(idx)
      this.tools.splice(idx, 1);
      this.tool_meta.amount=this.tool_meta.amount-parseInt(s.montant)
      this.tool_meta.concern=this.tool_meta.concern.split(s.nom+";").join("")
    }
    console.log(this.tool_meta);
  }

  message(){
    let confirm = this.alertCtrl.create({
      title: this.lang.mtitle,
      message: this.lang.mmsg,
      inputs: [
        {
          name: 'msg',
          placeholder: 'Message concis'
        },
      ],
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
          handler: (data) => {
            this.tool_meta.msg=data.msg;
           this.tool_msg= data.msg;
          }
        }
      ]
    });
    confirm.present();
  }

  getCards(){

    return this.cards;
  }

  bilan(obj:{msg:string,amount:number,concern:string},target:string,datas?:any){
    this.translate.get([
      "canal_pag.summary_title",
      "canal_pag.summary_msg"
    ],{amount:obj.amount,description:obj.msg,concern:obj.concern}).subscribe(translated=>{
      let lang={
        btitle:translated["canal_pag.summary_title"],
        bmsg:translated["canal_pag.summary_msg"]
      };

      console.log(target,obj,datas)
      let bill = this.alertCtrl.create({
        title: lang.btitle,
        message: lang.bmsg,
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
            handler: (data) => {
             if(target=='tools'){
               let p={
                 message: this.tool_msg,
                 accessoires: this.tools,
                 login: this.login,
                 cle_de_session: this.cle_de_session,
               }
               this.API.postRequest('accessoires_paiement',p).then((dat:any)=>{
                 console.log(dat)
                 this.toast.success(dat.message)
               },(err)=>{
                 this.toast.success(err.message)
               })
             }
             else if(target == 'resubcribe'){
               let p = {
                 login: this.login,
                 cle_de_session: this.cle_de_session,
                 service:datas.id,
                 info_client:datas.card_id

               };
               this.API.postRequest('valider_paiement',p).then((dat:any)=>{
                 console.log(data)
                 this.toast.success(dat.message)
               },(err)=>{
                 console.log(err)
               });
            }else if(target=='subcribe'){
               this.API.postRequest('souscription_paiement',datas).then((dat:any)=>{
                 console.log(data)
                 this.toast.success(dat.message);
               },(err)=>{

               });
             }
            }
          }
        ]
      });
      bill.present();
    });


  }

  getTools(){
    this.bilan({msg:this.tool_meta.msg,concern:this.tool_meta.concern,amount:this.tool_meta.amount},'tools');
  }

  presentModal(s:{card_id:string}) {
    this.profileModal = this.modalCtrl.create(ClientModalPage, { client: null ,login: this.login, cle_de_session:this.cle_de_session});
    this.profileModal.onDidDismiss(data => {
      // console.log(data);
      if(data != undefined){

          s.card_id = data.id;
          this.cards.unshift(data);

      }


    });
    this.profileModal.present();
  }

  addCard(s:{card_id:string}){

    this.presentModal(s);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CanalPage');
  }

}
