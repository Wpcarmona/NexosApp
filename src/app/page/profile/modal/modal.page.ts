import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  id: string;
  idu: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  vdata: number = 0;

  validationMessages = {
    profileNames1: [
      { type: 'required', message: 'Por favor ingrese el Alias' },
    ],
    profileDocument1: [
      { type: 'required', message: 'Por favor ingresa la entidad bancaria' },
    ],
    profileTown1: [
      { type: 'required', message: 'Por favor ingrese la moneda' },
    ],
  };
  ValidationFormUSer: FormGroup;
  cuentaC: string;
  cuentaA: string;
  ncuenta: string;
  identificador: number;
  select: any = 'ahorro';
  alias: any;
  entbank: any;
  moneda: any;

  constructor(
    private modalCtrl: ModalController,
    private authservice: AuthService,
    private db: AngularFireDatabase,
    private formbuilder: FormBuilder
  ) {
    this.cuentaAhorro();
    this.identificadordecuenta();
  }

  dismissModal() {
    this.vdata = 0;
    this.modalCtrl.dismiss({
      vdata: 0,
    });
  }

  ngOnInit() {
    this.idu = this.authservice.getUID();
    console.log(this.idu);

    this.ValidationFormUSer = this.formbuilder.group({
      profileNames1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      profileDocument1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      profileTown1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  cuentaAhorro() {
    this.cuentaA = 944 + '-' + Math.floor(Math.random() * 100000000 + 1);
    this.ncuenta = this.cuentaA;
  }

  cuentaCorriente() {
    this.cuentaC = 544 + '-' + Math.floor(Math.random() * 100000000 + 1);
    console.log(this.cuentaC);
    this.ncuenta = this.cuentaC;
  }

  identificadordecuenta() {
    this.identificador = Math.floor(Math.random() * 1000000000000 + 1);
    console.log(this.cuentaC);
  }

  seleccion(event) {
    this.select = event.detail.value;
    if ((this.select = 'corriente')) {
      this.cuentaCorriente();
    } else if ((this.select = 'ahorro')) {
      this.cuentaAhorro();
    }
  }

  sss() {
    console.log(this.select);
  }

  uid() {
    this.authservice.uid = this.authservice.getUID();
  }

  save() {
    if (this.select == 'corriente') {
      this.db.database
        .ref('datos/')
        .child('user')
        .child(this.idu)
        .child('cuentaCorriente')
        .child(this.ncuenta)
        .update({
          cuenta: this.ncuenta,
          saldo: 0,
          Alias: this.alias,
          entidadBancaria: this.entbank,
          moneda: this.moneda,
        });
    } else if (this.select == 'ahorro') {
      this.db.database
        .ref('datos/')
        .child('user')
        .child(this.idu)
        .child('cuentaAhorro')
        .child(this.ncuenta)
        .update({
          cuenta: this.ncuenta,
          saldo: 0,
          Alias: this.alias,
          entidadBancaria: this.entbank,
          moneda: this.moneda,
        });
    }
    this.dismissModal();
  }
}
