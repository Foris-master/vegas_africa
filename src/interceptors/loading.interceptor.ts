import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {LoadingController} from "ionic-angular";
import {UserProvider} from "../providers/user/user";
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  public loading: any ; /**/

  public  isView: boolean=false;
  public  translate: TranslateService;
  public  lmsg : string;

  constructor(public loadingCtrl: LoadingController,public  userService : UserProvider,private injector:Injector) {

    setTimeout(() => {
       this.translate=injector.get(TranslateService);
       this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
         // do something
         this.loadLang();
       });
    })

    this.userService.getOnStorage();
  }

  loadLang(){
    this.translate.get("loading.message").subscribe(translated=>{
      this.lmsg=translated;
    });
  }

  async getUser(){
    return await  this.userService.getOnStorage();
  }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let lprom = null;
     if(!this.isView){
       if(this.translate){
         this.loadLang();
       }
       lprom = this.show(!(req.params.get("show_loading")=='false'));

     }
     /*if(req.method=='GET'){
       let p = req.params.set("login",this.userService.user.email)
         .set("cle_de_session",this.userService.user.cle_de_session);
       req = req.clone({
         params : p,
       });
     }else if(req.method=='POST'&& req.body.login==null){
       req.body.login=this.userService.user.email
       req.body.cle_de_session=this.userService.user.cle_de_session

       /!*req = req.clone({
         body : p,
       });*!/
     }*/

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        // console.log(lprom);
        if(lprom){
          lprom.then(()=>{
            this.hide(!(req.params.get("show_loading")=='false'));
          });
        }
        /*console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));*/
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
        content: this.lmsg,
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
