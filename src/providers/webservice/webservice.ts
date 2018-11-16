import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { Network } from '@ionic-native/network';
/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebserviceProvider {

  public apiUrl: string;
  public loading: any;

  
  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private network: Network,
              public toastCtrl: ToastController) {

    console.log('Hello CategoriasProvider Provider');

    //let disconnectSubscription = 
    this.network.onDisconnect().subscribe(() => {

        let toast = this.toastCtrl.create({
          message: 'Por favor revisa tu conexion a internet y vuelve a intentarlo',
          showCloseButton: true,
          closeButtonText: 'Aceptar',
          position: 'top'
        });
        toast.present();     
    });   
}

  getCategorias() {
        this.load("Cargando...");
        
        this.apiUrl='http://74.207.233.164/PreciosSuper/Controller/GetCategorias.php';
         //opcional
        let options = {
          headers: { 'Content-Type': 'application/json' }
        };

        return new Promise(resolve => {      
          this.http.post(this.apiUrl,'',options)
           .subscribe(data => {
              resolve(data);
              this.loading.dismiss();
              //console.log(data);
          }, error => {
              console.log("Error al consumir el web service!");
              this.loading.dismiss();
              this.msjError("No se logró recuperar información");
          });
         
        });
    
  }  

  getProductos(id_categoria) { 

      localStorage.setItem("G_idCategoria", id_categoria);
      
      this.load("Cargando...");
      this.apiUrl='http://74.207.233.164/PreciosSuper/Controller/GetProductos.php';
      let data = {categoria: id_categoria};
      //opcional
      let options = { headers: {'Content-Type': 'application/json' } };
    
      return new Promise(resolve => {      
        this.http.post(this.apiUrl,JSON.stringify(data),options)
          .subscribe(data => {
            resolve(data);
            this.loading.dismiss();
        }, error => {
            console.log("Error al consumir el web service de productos!");
            this.loading.dismiss();
            this.msjError("No se obtuvo información");
        });
        
      });
  
  }  

  updatePrecio(id,precio) {

          this.load("Guardando...")
          this.apiUrl='http://74.207.233.164/PreciosSuper/Controller/UpdatePrecio.php';
          
          let datos = {id: id, precio: precio};
          //opcional
          let options = { headers: {'Content-Type': 'application/json' } };
        
          return new Promise(resolve => {      
            this.http.post(this.apiUrl,JSON.stringify(datos),options)
              .subscribe(data => {
                resolve(data); //console.log(data);
                this.loading.dismiss();
            }, error => {
                console.log("Error al consumir el web service para actualizar el precio!");
                this.loading.dismiss();
                this.msjError("Error al actualizar los datos, intente nuevamente");
            });
            
          });      
  }  

  load(msj){
    this.loading = this.loadingCtrl.create({
      content: msj,
    });
    this.loading.present();
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
