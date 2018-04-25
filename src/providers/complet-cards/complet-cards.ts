import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiProvider} from "../api/api";
import {AuthProvider} from "../auth/auth";
import {AutoCompleteService} from "ionic2-auto-complete";

/*
  Generated class for the CompletCardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompletCardsProvider implements AutoCompleteService{

  labelAttribute = "num_carte";
  formValueAttribute="id";
  constructor(public http: HttpClient,private  Auth : AuthProvider,private API: ApiProvider) {
    console.log('Hello CompletServicesProvider Provider');
  }
  getResults(term: any): any {
    return new Promise((resolve,reject) => {
      this.Auth.getAuthUser().then((u)=>{
        let p = {
          login: u.num_tel,
          cle_de_session: u.cle_de_session,
          show_loading:false,
          query: term,
          pagin: 0,
          tout:1
        };
        this.API.getRequest('lister_client_info',p).then(
          (data: any)=>{
            resolve(data.message.data);
          },(err)=>{
            reject(err)
          }
        )

      })


    });
  }

}
