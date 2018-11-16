import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
//import { PrincipalPage } from '../../pages/principal/principal';
import { ListprodPage } from '../../pages/listprod/listprod';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LoginProvider]//importamos nuestro servicio
})

export class LoginPage {
  public existUser: any;
  public C = { usuario: '', password: '' };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public ws : LoginProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public menu:MenuController,
              public toastCtrl: ToastController) { 
  }

  
  ionViewDidLoad() {
    console.log('Logearse');
    this.menu.enable(false);//desactiva el menu en el login
  }
 
  public login() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
    });
    loading.present();

    this.ws.getUsers(this.C.usuario, this.C.password).then((result) =>{
        this.existUser = result;

        if (this.existUser.exist==1) {
              this.navCtrl.push(ListprodPage,{id : 292, nombre :"Cítricos"});              
        }else{
              console.log("usuario no existe");
              this.msjError('El Usuario o la contraseña no coinciden con ninguna cuenta!');
        }

        loading.dismiss();
    });

  }

  msjError(msj) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: msj,
      buttons: ['OK'],
      cssClass: 'clssAlert'

    });
    alert.present();
  }

}
//C:\Users\Alvore\AppData\Local\Android\Sdk\extras\intel\Hardware_Accelerated_Execution_Manager