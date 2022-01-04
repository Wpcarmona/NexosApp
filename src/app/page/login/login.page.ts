import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  validationUserMessage = {
    email: [
      { type: 'required', message: 'Por favor ingrese su correo electrónico' },
      {
        type: 'pattern',
        message: 'El correo es incorrecto por favor intente de nuevo ',
      },
    ],
    password: [
      { type: 'required', message: 'Por favor ingrese su contraseña' },
      {
        type: 'minlength',
        message: 'La contraseña debe contener 5 caracteres o más',
      },
    ],
  };

  validationFormUser: FormGroup;

  email: string;
  emaile: string;
  uid: any;

  constructor(
    public formbuider: FormBuilder,
    public authservice: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private nav: NavController,
    private passwordEye: ElementRef,
    private db: AngularFireDatabase,
    public alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.validationFormUser = this.formbuider.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  async LoginUser(value) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'por favor espere',
      backdropDismiss: true,
      translucent: true,
    });
    loading.present();
    try {
      this.authservice
        .loginFireauth(value)
        .then((resp) => {
          console.log(resp);
          console.log(resp.user);
          if (resp.user) {
            this.authservice.setUser({
              username: resp.user.displayName,
              uid: resp.user.uid,
            });
            const userProfile = this.firestore
              .collection('profile')
              .doc(resp.user.uid);
            userProfile.get().subscribe((result) => {
              if (result.exists) {
                this.uid = resp.user.uid;
                console.log(this.uid);
                loading.dismiss();
                this.router.navigate(['/profile', this.uid]);
              } else {
                this.db.database
                  .ref('datos/')
                  .child('user')
                  .child(this.authservice.getUID())
                  .set({
                    name: resp.user.displayName,
                    email: resp.user.email,
                    document: localStorage.getItem('document'),
                    phone: localStorage.getItem('phone'),
                  });
                this.db.database
                  .ref('datos/')
                  .child('user')
                  .child(this.authservice.getUID())
                  .child('cuentaCorriente')
                  .child(localStorage.getItem('cuentac'))
                  .update({
                    cuenta: localStorage.getItem('cuentac'),
                    saldo: 0,
                  });
                this.db.database
                  .ref('datos/')
                  .child('user')
                  .child(this.authservice.getUID())
                  .child('cuentaAhorro')
                  .child(localStorage.getItem('cuentaa'))
                  .update({
                    cuenta: localStorage.getItem('cuentaa'),
                    saldo: 0,
                  });
                this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
                  name: resp.user.displayName,
                  email: resp.user.email,
                  document: localStorage.getItem('document'),
                  phone: localStorage.getItem('phone'),
                });
                this.uid = resp.user.uid;
                loading.dismiss();
                this.nav.navigateForward(['profile', this.uid]);
              }
            });
          }
        })
        .catch(() => {
          loading.dismiss();
          this.errorEmail();
        });
    } catch (err) {
      console.log('Error');
    }
  }
  async errorEmail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al iniciar sesión',
      message: 'el usuario o contraseña son incorrectos',
      buttons: ['OK'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  registro() {
    this.router.navigate(['/register']);
  }
  inicio() {
    this.router.navigate(['/tabs/tab2']);
  }
  resetpassword() {
    this.router.navigate(['/resetpassword']);
  }
}
