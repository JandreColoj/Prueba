import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WebserviceProvider } from '../../providers/webservice/webservice';
import { AlertController } from 'ionic-angular';
import { ListprodPage } from '../listprod/listprod';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  public detalle: any;
  public nuevo_precio: number;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public ws: WebserviceProvider,
              public alertCtrl: AlertController) {

    this.detalle=this.navParams.data;
  }

  ionViewDidLoad() {   
    console.log('pagina de detalle');
    //console.log(this.detalle);
  }

  cambiarPrecio(data, n_precio){

    if (this.validateDecimal(n_precio)) {

      this.ws.updatePrecio(data.id,n_precio).then((result: any) =>{
              
              if(result.status==200){        
                  this.alert("Precio actualizado exitosamente");
                  let nombre = localStorage.getItem("G_nombreCategoria");
                  let id     = localStorage.getItem("G_idCategoria");
                  this.navCtrl.push(ListprodPage,{id : id, nombre : nombre})
              }else{
                this.alert("Error al guardar los cambios");
                
                //let id = localStorage.getItem("G_idCategoria");
                //this.navCtrl.push(ListprodPage,id)

              }
      });
      
    }else{
        this.alert("Ingresar un precio")       
    }
  }

    validateDecimal(valor) {
      var RE = /^([0-9])*[.]?[0-9]*$/;
      if (RE.test(valor)) {
          return true;
      } else {
          return false;
      }
    }

    alert(msj){
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: msj,
          buttons: ['OK'],
        });
        alert.present();
    }

}
