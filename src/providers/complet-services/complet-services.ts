import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AutoCompleteService} from "ionic2-auto-complete";
import {AuthProvider} from "../auth/auth";
import {ApiProvider} from "../api/api";
import {IonicApp} from "ionic-angular";

/*
  Generated class for the CompletServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompletServicesProvider  implements AutoCompleteService {
  labelAttribute = "nom";
  formValueAttribute="id";
  public service_id:any;
  constructor(public http: HttpClient,private  Auth : AuthProvider,private API: ApiProvider) {
    console.log('Hello CompletServicesProvider Provider');
  }
  getResults(term: any): any {
    return new Promise((resolve,reject) => {
      this.Auth.getAuthUser().then((u)=>{
        let p = {
          login: u.num_tel,
          cle_de_session: u.cle_de_session,
          service_id:this.service_id,
          show_loading:false,
          query: term,
          souscription:1
        };


        this.API.getRequest('sous_service',p).then(
          (data: any)=>{
           resolve(data.message);
          },(err)=>{
            reject(err)
          }
        )

      })


    });
  }



}
