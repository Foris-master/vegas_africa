import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {LoadingController} from "ionic-angular";
import {UserProvider} from "../providers/user/user";
import {AuthenticatedUser} from "../models/user";
import set = Reflect.set;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  public loading: any ; /**/

  public  isView: boolean=false;

  constructor(public loadingCtrl: LoadingController,public  userService : UserProvider) {
    this.getUser()
  }

  async getUser(){
    return await  this.userService.getOnStorage();
  }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let lprom = null;

     if(!this.isView){
       lprom = this.show(!(req.params.get("show_loading")=='false'));
     }
    let user =this.userService.user ;
    let p = req.params.set("login",user.email)
      .set("cle_de_session",user.cle_de_session);
    req = req.clone({
      params : p,
    });

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log(lprom);
        if(lprom){
          lprom.then(()=>{
            this.hide(!(req.params.get("show_loading")=='false'));
          });
        }
        console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));
      }
    },(err)=>{
      if(lprom){
        lprom.then(()=>{
          this.hide(!(req.params.get("show_loading")=='false'));
        });
      }
    });



  }


  show(b) {
    if(!this.loading&&b){
      this.loading = this.loadingCtrl.create({
        content: "veuillez patientez...",
        spinner: 'dots'
      });
     return this.loading.present();
    }
    return null;

  }

  hide(b: boolean) {
    if(this.loading&&b){
      this.loading.dismiss();
      this.loading = null;
    }
  }

}