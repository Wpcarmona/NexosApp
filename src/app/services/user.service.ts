import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:string

  constructor() { }


  setUid(_user:string){ 
    this.user = _user
    //console.log(_uid); para ver en consola
  }
  getUid(){
    return this.user;
  }
}
