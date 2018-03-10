import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Toast, ToastController} from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  public toast: Toast;
  constructor(public http: HttpClient,public toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  prepare(msg: string) {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    this.toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

  }
  success(msg:string){
    this.prepare(msg);
    this.toast.setCssClass("toast-success");
    this.present();
  }
  error(msg:string){
    this.prepare(msg);
    this.toast.setCssClass("toast-error");
    this.present();
  }
  info(msg:string){
    this.prepare(msg);
    this.toast.setCssClass("toast-info");
    this.present();
  }
  warning(msg:string){
    this.prepare(msg);
    this.toast.setCssClass("toast-warning");
    this.present();
  }

  present(){
    this.toast.present();
  }

}
