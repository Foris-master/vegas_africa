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
import {CompletServicesProvider} from "../../providers/complet-services/complet-services";
import {CompletCardsProvider} from "../../providers/complet-cards/complet-cards";


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
  public services : Array<any>;
  public souscription_services : Array<any>;
  public selectedIndex:number=0;
  public  cards : Array<Carte> =[];
  public  kits : Array<any> =[];
  public  types : Array<any> =[];
  public  accessoires : Array<any> =[];
  public  type_livraisons : Array<any> =[];
  public souscription_form: FormGroup;
  public profileModal: Modal;
  public tool_msg:string;
  public tool_meta:{amount:number,concern:string,msg?:string}={amount:0,concern:""};
  public lang: {mtitle:string,mmsg:string,mcancel:string,mcancelm:string,mdel:string,btitle:string,bmsg:string};

  constructor(public navCtrl: NavController, public navParams: NavParams,private API: ApiProvider, private _FB : FormBuilder
              ,private  Auth : AuthProvider,public modalCtrl: ModalController,public alertCtrl: AlertController,
              private translate: TranslateService,private  toast: ToastProvider,
              public autocompleteservice:CompletServicesProvider,public autocompletecard: CompletCardsProvider) {

    this.loadLang();
    this.autocompleteservice.service_id=this.navParams.get("service_id");
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      this.loadLang();
    });

    this.Auth.getAuthUser().then((u)=>{
      this.login=u.num_tel;
      this.cle_de_session= u.cle_de_session;
      let p: { cle_de_session?:any,login?:any,service_id?:any,souscription?:any}= {
        login: this.login,
        cle_de_session: this.cle_de_session,
        service_id:this.navParams.get("service_id"),
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
      let pa ={login:p.login,cle_de_session:p.cle_de_session,pour_souscription:0};
      this.API.getRequest('type_installation',pa).then(
        (data: any)=>{
          this.type_livraisons = data.message;
        },(err)=>{
          console.log(err)
        }
      )

    })

    this.souscription_form = this._FB.group({
      'offer'        : ['', Validators.compose([Validators.required])],
      'kit'        : ['', Validators.compose([Validators.required])],
      'type'        : ['', Validators.compose([Validators.required])],
      'tel'     : ['', Validators.compose([Validators.required,Validators.minLength(9)])],
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
      formule:this.souscription_form.controls.offer.value,
      kit:this.souscription_form.controls.kit.value,
      type:this.souscription_form.controls.type.value,
      adresse:this.souscription_form.controls.adresse.value,
      ville:this.souscription_form.controls.ville.value,
      tel:this.souscription_form.controls.tel.value,
      quartier:this.souscription_form.controls.quartier.value,
      login: this.login,
      cle_de_session: this.cle_de_session,
    }
    let of = this.services.find(this.findIndexToUpdate,p.formule);
    let ko = this.kits.find(this.findIndexToUpdate,p.kit);
    let to = this.types.find(this.findIndexToUpdate,p.type);
    let am =0 ;
    let con="";
    con+=ko.nom;
    con+=" | ";
    con+=to.nom;
    con+=" | ";
    con+=of.nom;
    am+=parseFloat(ko.montant);
    am+=parseFloat(to.montant);
    am+=parseFloat(of.montant);
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

  getTools(id){
    let tl = this.type_livraisons.find(this.findIndexToUpdate,id);
    let am =0 ;
    let con="";
    con+="type livraison : "+tl.nom;
    con+=" | ";
    con+=this.tool_meta.concern;
    am+=parseFloat(tl.montant);
    am+=this.tool_meta.amount;
    this.bilan({msg:this.tool_meta.msg,concern:con,amount:am},'tools',{type:tl.id});
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
                 show_loading:true,
                 type:datas.type
               }
               this.API.postRequest('accessoires_paiement',p).then((dat:any)=>{
                 console.log(dat)
                 this.toast.success(dat.message)
               },(err)=>{
                 this.toast.error(err.message)
               })
             }
             else if(target == 'resubcribe'){
               let p = {
                 login: this.login,
                 cle_de_session: this.cle_de_session,
                 service:datas.id,
                 info_client:datas.card_id,
                 show_loading:true,

               };
               this.API.postRequest('valider_paiement',p).then((dat:any)=>{
                 console.log("suc",data)
                 this.toast.success(dat.message)
               },(err)=>{
                 console.log("err",err)
                 this.toast.error(err.message)
               });
            }else if(target=='subcribe'){
               this.API.postRequest('souscription_paiement',datas).then((dat:any)=>{
                 console.log(data)
                 this.toast.success(dat.message);
               },(err)=>{
                 this.toast.error(err.message)
               });
             }
            }
          }
        ]
      });
      bill.present();
    });


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
