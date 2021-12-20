import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth:AngularFireAuth,
    private router: Router,
    private user:UserService
  ) {
    this.initializeApp();
    
  }
  async initializeApp(): Promise<void> {
    await this.platform.ready();
  this.platform.backButton.subscribeWithPriority(1, () =>{

  });
    this.platform.ready().then(() => {
      this.router.navigate(['login']);  
    });
  }

    //verificar que se hizo inicio de sesión
   /* verifyCurrentUser(){
    this.auth.authState.subscribe((e:any)=>{
      //console.log(e);
      if(e==null){
        //pagina a la que te dirige automaticamente al iniciar la aplicacion 
        this.router.navigate(['/tabs/tab2'])
      }else{
        //console.log(e.uid); ver lo que esta mandando 
        this.user.setUid(e.uid)
        localStorage.setItem("uid", e.uid)
        //una ves iniciado sesion es a la pagina que te va a redirigir 
        this.router.navigate(['/camara'])
      }

    })
  }*/
}
