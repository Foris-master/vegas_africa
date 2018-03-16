import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticatedUser} from "../../models/user";
import {UserProvider} from "../user/user";
import {Transaction} from "../../models/transaction";

/*
  Generated class for the this provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface BackResp {
  code: string,
  message: any,
  status: string
}


@Injectable()
export class ApiProvider {

  public BASE_URL ='http://www.vegasafrica.net/management/api/Management/';
  public user: AuthenticatedUser;
  public auth_prom: Promise<any>;


  /* ---------------------------------------------------------------------------------------------------------------- */

  constructor(private userService: UserProvider, private http: HttpClient) {
  }



  /**
   * Get the Json Web Token from the local storage.
   *
   * @returns {RequestOptions}
   */
  private formatBody(body:  Object)  {

    let params = new HttpParams();
    for(let key in body){
      params=params.set(key,body[key]+"");
    }
    return params;
  }

  /* ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Perform a PUT request.
   *
   * @param url
   * @param auth
   * @param body
   * @returns {Observable<>}
   */
  putRequest(url: string, body: Object, auth: boolean = true) {


    if (auth) {
      body = this.formatBody(body);
    }

    return new Promise((resolve, reject) => {

      this.http.put<BackResp>(this.BASE_URL + url, body)
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
  /**
   * Perform a POST request.
   *
   * @param url
   * @param auth
   * @param body
   * @returns {Promise<>}
   */
  postRequest(url: string, body: Object, auth: boolean = true) {


    if (auth) {
      body = this.formatBody(body);
    }

    return new Promise((resolve, reject) => {

      this.http.post<BackResp>(this.BASE_URL + url, body)
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



  /**
   * Perform a GET request.
   *
   * @param url
   * @param auth
   * @param params
   * @returns {Promise<>}
   */
  getRequest(url: string,params?: Object, auth: boolean = true) {

    return new Promise((resolve, reject) => {
        let p = this.formatBody(params);
        this.http.get<BackResp>(this.BASE_URL + url,{params : p} )
          .subscribe(res => {
            if(res.code=="200"){
              if(url=='historique'){
                res.message.data = Transaction.ParseFromArray(res.message.data)
              }
              resolve(res);
            }else{
              reject(res);
            }
          }, (err) => {
            reject(err);
          });

      })
  }

  /*/!**
   * Perform a DELETE request.
   *
   * @param url
   * @param auth
   * @returns {Observable<>}
   *!/
  deleteRequest(url: string, auth: boolean = true): Observable<Object> {
    let header = null;

    if (auth) {
      header = this.formatHeader();
    }
    return this.http.delete(this.BASE_URL + url, header)
      .map(this.handleBody)
      .catch(this.handleError);
  }*/

}
