import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalPage } from './modal/modal.page';
import { CuentacPage } from './cuentac/cuentac.page';
import { CuentaaPage } from './cuentaa/cuentaa.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id:string;
  idu:any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  removerdatolegal: AngularFireObject<any>;

  segment1: boolean = true;
  segment2: boolean = false;

  itemRef: any;
  cuentaCorriente = [];
  cuentaAhorro = [];
  document: number;
  phone: number;
  email: string;
  names: string;
  key:string;
  

  loading:any;
  




  constructor(
    private authservice: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCTR:ModalController,
    public alertController: AlertController,
    ) {
      this.loading = this.loadingCtrl
   }


  ngOnInit() {

    localStorage.removeItem('document')
    localStorage.removeItem('phone')
    this.idu = this.authservice.getUID();
    this.carguedetodo();

  }

  async modal(){
    const modal = await this.modalCTR.create({
      component: ModalPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: {
        id: this.idu,
        
      }
    });

     await modal.present();
     const {data} = await modal.onDidDismiss();
     console.log(data)

     if(data.vdata == 1 ){
      this.carguedetodo();
       console.log('cargado')
     }
    
  }

  async modalcuentac(id){
    const modal = await this.modalCTR.create({
      component: CuentacPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: { id }
    });

     await modal.present();
     const {data} = await modal.onDidDismiss();
     console.log(data)
  }

  async modalcuentaa(id){
    const modal = await this.modalCTR.create({
      component: CuentaaPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: { id }
    });

     await modal.present();
     const {data} = await modal.onDidDismiss();
     console.log(data)
  }



  

  

  async carguedetodo(){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      backdropDismiss: true,
      translucent: true,
    });
      loading.present();
      this.info(); 
      this.cahorro();
      this.ccorriente();
      loading.dismiss();
    }

  info(){
    this.db.database.ref('datos/'+ 'user/' + this.authservice.getUID()).on('value',(snapshot) =>{
      const data = snapshot.val()
      this.document = snapshot.val().document
      this.names = snapshot.val().name
      this.key = this.authservice.getUID()
    })
  }


  ccorriente(){
    this.itemRef = this.db.object('datos/'+ 'user/' + this.authservice.getUID() + '/cuentaCorriente' );
    this.itemRef.snapshotChanges().subscribe(action => {
      //this.notify()
      let data = action.payload.val();
      this.cuentaCorriente
   = [];
      console.log(data);
      for (let k in data) {
        let user = data[k];
        user.key = k;
        console.log(user);
        this.cuentaCorriente
    .push(user)
      }
    });
  }

  cahorro(){
    this.itemRef = this.db.object('datos/'+ 'user/' + this.authservice.getUID() + '/cuentaAhorro' );
    this.itemRef.snapshotChanges().subscribe(action => {
      //this.notify()
      let data = action.payload.val();
      this.cuentaAhorro
   = [];
      console.log(data);
      for (let k in data) {
        let user = data[k];
        user.key = k;
        console.log(user);
        this.cuentaAhorro
    .push(user)
      }
    });
  }
 
  uid(){
    this.authservice.uid = this.authservice.getUID();
    //console.log(this.authservice.uid)
  }

 
  



  logout(){
    this.authservice.logout()
    this.router.navigate(['/login'])
  }


 

  segmentChanged(event){
    var segment = event.detail.value;
    if(segment == "segment1"){
      this.segment1 = true;
      this.segment2 = false;
    }else if( segment = "segment2"){
      this.segment1 = false;
      this.segment2 = true;
    }
  }

  modalAhorro(id){
    console.log(id)
  }

  modalCorriente(id){
    console.log(id)
  }

  
}
