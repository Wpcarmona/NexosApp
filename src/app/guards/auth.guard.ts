import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth'
import { map } from "rxjs/operators";
import firebase from 'firebase/app';
import 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( (resolve, reject)=>{
      firebase.auth().onAuthStateChanged((user: firebase.User)=>{
         if(user){

          resolve(true);
        }else{
          resolve(false);
          this.router.navigate(['login']);
        }
      })
    })
  }
}
