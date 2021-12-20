import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

export  interface UserPro{
  username: string;
  uid: string;
  //document:string;
  //phone:string;
}
export class Appointment {
  $key: string;
  address:string;
  document:string;
  email:string;
  phone:string;
  town:string;
  arch:string;
  fecha:any;
  fexp:any;
  fven:any;
  instGes:string;
  obligacion:string;
  rzon:string;
  names:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public calificacion:number;
  public total_calificacion:number;
  public documento:number;
  public documento2:any;
  public document:number;
  private user : UserPro;
  public uid: any;
  public uid2:any;
  public uid3:any;
  public borrarIDdatolegal:Number;
  bookingRef: AngularFireObject<any>;
  bookingListRef: AngularFireList<any>;
  getdata1:AngularFireList<any>;
  constructor(
      public auth: AngularFireAuth, 
      private db: AngularFireDatabase,
      //private googleplus: GooglePlus
      ) { 
      }

      
  private data = [
    {
      category: 'GESAM',
      expanded: true,
      products: [
        { id: 0, 
          ame: 'Salami', 
          price: '8' 
        },
        { id: 1, 
          name: 'Classic', 
          price: '5' 
        },
        { id: 2,
          name: 'Tuna', 
          price: '9' 
        },
        { id: 3, 
          name: 'Hawai', 
          price: '7' 
        }
      ]
    },
    /*{
      category: 'APP',
      products: [
        { id: 4, name: 'Mac & Cheese', price: '8' },
        { id: 5, name: 'Bolognese', price: '6' }
      ]
    },*/
    
  ];
 
  private cart = [];
 

  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  addProduct(product) {
    this.cart.push(product);
  }


loginFireauth(value){
    
   return new Promise<any> ( (resolve, reject)=>{
     this.auth.signInWithEmailAndPassword(value.email, value.password).then(
       
       res => resolve(res),
       error => reject(error)
       
     )
    
   })
  }

  
  setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }

  ResetPassword(value){
    return new Promise<any> ( (resolve, reject)=>{
      this.auth.sendPasswordResetEmail(value.email).then(
        res => resolve(res),
        error => reject(error)
      )
    })
   }

   validationEmail(value){
     return new Promise<any> ( (resolve, reject)=>{
      this.auth.sendSignInLinkToEmail(value.email, value.password).then(
        
        res => resolve(res),
        error => reject(error)
        
      )
     
    })
   }

  



  userRegistration(value){
    return new Promise<any> ( (resolve, reject)=>{
      this.auth.createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }

  
  
  async logout(): Promise<any> {
    return this.auth.signOut();
    
  }

  createBooking(apt: Appointment) {
    return this.bookingListRef.push({
      address: apt.address,
      
    })
  }

   getBooking(id: string) {
    this.bookingRef = this.db.object('/datos/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/datos' );
    return this.bookingListRef;
  }

  getBookingList1(id:string) {
    this.bookingListRef = this.db.list('/datos' + id );
    return this.bookingListRef;
  }

  getdata(id:string){
    this.db.database.ref('/datos').child(id).child('datolegal').on('value',(snapshot) =>{
      const data = snapshot.val()
     console.log(data)
    })
  }

  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      address: apt.address,
    })
  }

  // Delete
  deleteBooking(id: string) {
    console.log(this.borrarIDdatolegal)
    this.bookingRef = this.db.object('datos/' + this.borrarIDdatolegal + '/' + 'datolegal' + '/' + id);
    this.bookingRef.remove();
  }

 
}
