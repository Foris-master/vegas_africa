import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl ='http://www.vegasafrica.net/management/api/Management/';

interface BackResp {
  code: string,
  message: string,
  status: string
}

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  request_reset(data: {login: string}) {
    let d = {}
    if(data.login.split("@").length>1){
      d = {
        email : data.login,
      };

    }else {
      d= {
        num_tel : data.login,
      };
    }
    return new Promise((resolve, reject) => {

      this.http.post(apiUrl + 'forgotpassword', d)
        .subscribe(res => {
          console.log(res)
          if(res["code"]==200){
            resolve(res);
          }else{
            reject(res);
          }

        }, (err) => {
          reject(err);
        });
    });
  }

  reset(data: {code: string}) {


    return new Promise((resolve, reject) => {

      this.http.post(apiUrl + 'forgotpassword', data)
        .subscribe(res => {
          console.log(res)
          if(res["code"]==200){
            resolve(res);
          }else{
            reject(res);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data: {login: string,mot_de_pass: string}) {
    let d = {}
    if(data.login.split("@").length>1){
      d = {
        email : data.login,
        mot_de_pass : data.mot_de_pass,
      };
    }else {
      d= {
        num_tel : data.login,
        mot_de_pass : data.mot_de_pass,
      };
    }
    return new Promise((resolve, reject) => {

      this.http.post<BackResp>(apiUrl + 'login', d)
        .subscribe(res => {
          console.log(res)
          if(res.code=="200"){
            resolve(res);
          }else{
            reject(res);
          }
        }, (err) => {
          reject(err);
        });
    });
  }


  register(data: {email:string,mot_de_pass:string,ville:string,num_tel:string,num_carte:string}) {
    return new Promise((resolve, reject) => {
      // let headers = new Headers();
     /*let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };*/

      this.http.post<BackResp>(apiUrl + 'registration',data)
        .subscribe(res => {
          console.log(res)
          if(res.code=="200"){
            let d = {
              login: data.email,
              mot_de_pass: data.mot_de_pass
            };

            this.login(d).then((auth : any) =>
            {
              resolve(auth);
            })
              .catch((error : any) =>
              {
                reject(error);
              });
          }else{
            reject(res);
          }
        }, (err) => {
          reject(err);
        });
    });
  }
}
