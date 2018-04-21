import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticatedUser} from "../../models/user";
import {UserProvider} from "../user/user";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface BackResp {
  code: string,
  message: string,
  status: string
}

@Injectable()
export class AuthProvider {
  public BASE_URL ='http://www.vegasafrica.net/management/api/Management/';
  private user: AuthenticatedUser;

  constructor(public http: HttpClient,private userService: UserProvider) {
    console.log('Hello AuthProvider Provider');
    this.getAuthUser()
  }
  isAuthenticated(){
    return new Promise((resolve )=>{
      this.userService.getOnStorage().then(
        (user) => {
          if(user&&user.cle_de_session){
            resolve(true)
          }else{
            resolve(false);
          }
        });
    });
  }
  getAuthUser():Promise<AuthenticatedUser>{
    return new Promise((resolve)=>{
       this.userService.getOnStorage().then(
        (user) => {
          this.user = user;
          resolve(user)
        });
    })

  }
  /**
   * Get the Json Web Token from the local storage.
   *
   * @returns {RequestOptions}
   */

  request_reset(data: {login: string}) {

    return new Promise((resolve, reject) => {

      this.http.post(this.BASE_URL + 'forgotpassword', data)
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

  reset(data: {code?: string,new_pass_word?:string}) {


    return new Promise((resolve, reject) => {

      this.http.post(this.BASE_URL + 'forgotpassword', data)
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
    return new Promise((resolve, reject) => {

      this.http.post<BackResp>(this.BASE_URL + 'login', data)
        .subscribe(res => {
          if(res.code=="200"){
            let user = AuthenticatedUser.ParseFromObject(JSON.parse(res.message));
            this.userService.createOnStorage(user).then(()=>{
              resolve(user)
            });
          }else{
            reject(res);
          }
        }, (err) => {
          reject(err);
        });
    });
  }


  register(data: {email:string,mot_de_pass:string,ville:string,num_tel:string}) {
    return new Promise((resolve, reject) => {
      // let headers = new Headers();
     /*let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };*/

      this.http.post<BackResp>(this.BASE_URL + 'registration',data)
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
