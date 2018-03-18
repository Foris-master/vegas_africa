import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {AuthenticatedUser} from "../../models/user";
import {Storage} from "@ionic/Storage";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private _user: Subject<AuthenticatedUser> = new Subject<AuthenticatedUser>();
  private _user2: AuthenticatedUser=AuthenticatedUser.GetNewInstance();

  constructor(private storage: Storage) {
    this.getOnStorage().then((u)=>{
      this._user2= u;
      }
    );

  }

  /* ---------------------------------------------------------------------------------------------------------------- */
  /* Observable use object                                                                                            */

  public subscribeToUserService(callback) {
    return this._user.subscribe(callback);
  }

  public updateUserService(user: AuthenticatedUser) {
    this._user.next(user);
  }

  /* ---------------------------------------------------------------------------------------------------------------- */
  /* User storage management                                                                                          */

  /**
   * Write user properties in the local storage.
   *
   * @param user
   * @returns {Promise<AuthenticatedUser>}
   */
  createOnStorage(user: AuthenticatedUser): Promise<AuthenticatedUser> {
    return new Promise((resolve) => {
      console.log('ok')
      this.getOnStorage().then((res) => {
        /*if (res) {

          this.deleteOnStorage().then(() => {
            this.updateUserService(user);
            this.storage.set('user', JSON.stringify(user)).then(()=>{
              resolve();
            });
          });
        }else {
          this.updateUserService(user);
          this.storage.set('user', JSON.stringify(user)).then(()=>{
            resolve();
          });
        }*/
        this.updateUserService(user);
        this.storage.set('user', JSON.stringify(user)).then(()=>{
          resolve();
        });
      })
    });
  }

  /**
   * Get user properties from local storage.
   *
   * @returns {Promise<AuthenticatedUser>}
   */
  getOnStorage(): Promise<AuthenticatedUser> {
    return new Promise((resolve,reject) => {
      this.storage.get('user').then((u)=>{
        this.updateUserService(u);
        this._user2 =u;
        u = AuthenticatedUser.ParseFromObject(JSON.parse(u))
        resolve(u);
      },(err)=>{
        reject(err)
      })
    });
  }

 /* /!**
   * Get user properties from local storage.
   *
   * @returns {Promise<AuthenticatedUser>}
   *!/
  getOnStorageSync() {
    this.updateUserService(JSON.parse(this.storage.get('user')));
    return this.storage.get('user');
  }*/

  /**
   * Update user properties from local storage.
   *
   * @param user
   * @returns {Promise<AuthenticatedUser>}
   */
  updateOnStorage(user: AuthenticatedUser): Promise<AuthenticatedUser> {
    return new Promise((resolve) => {
      resolve(this.storage.get('user'));
    });
  }

  /**
   * Delete user properties from local storage.
   *
   * @returns {Promise<AuthenticatedUser>}
   */
  deleteOnStorage(): Promise<AuthenticatedUser> {
    return new Promise((resolve) => {
      console.log('ici');
      this.storage.clear();
      resolve();
    });
  }


  get user(): AuthenticatedUser {
    return this._user2;
  }
}
