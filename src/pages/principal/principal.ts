import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

//import { DetallePage } from '../detalle/detalle';
//import { LoginPage } from '../login/login';
/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  
  public productos:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menu:MenuController) {
  }

  ionViewDidLoad() {

    console.log('pagina principal');
    this.menu.enable(true);//activa el menu

  }



}
