import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController} from 'ionic-angular';

import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetallePage } from '../detalle/detalle';
import { PrincipalPage } from '../principal/principal';
/**
 * Generated class for the ListprodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listprod',
  templateUrl: 'listprod.html',
})
export class ListprodPage {
  public productos:any;
  public allproductos:any;
  private nombre: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws: WebserviceProvider,
              public menu:MenuController) {
  }

  ionViewDidLoad() {
         this.menu.enable(true);//activa el menu
    
        console.log('pagina listado de productos');
        this.nombre=this.navParams.data['nombre'];
        this.ws.getProductos(this.navParams.data['id']).then((result: any) =>{
          
          this.productos = [];        
          let datos=result.data;
          var urlImagen="";
    
          datos.forEach(element => {  
            //console.log(element);    
                //let nombre= element.image.split('.',1);
                //urlImagen="http://www.alvore.com/super.alvore.com/image/cache/"+nombre[0]+"-100x100.png"; 
                urlImagen="http://www.alvore.com/super.alvore.com/image/"+element.image; 

                if (element.image=="") {
                  urlImagen="http://www.alvore.com/super.alvore.com/image/cache/no_image-100x100.png";
                }
                
               let precio: any = parseFloat(element.precio);
                  precio =parseFloat(precio).toFixed(2);

              this.productos.push({id:          element.product_id, 
                                   nombre:      element.name, 
                                   precio:      precio,
                                   description: element.description,
                                   img:<string> urlImagen  });
            
          });


          /* lista de dos  */ 
          let arrayaux= [];
          this.allproductos=[];
          let contador=1;

          this.productos.forEach(element=>{

                arrayaux.push(element);

                if (contador==2) {
                  this.allproductos.push(arrayaux);
                  arrayaux=[];
                  contador=1;
                }else{
                  contador++;
                }
                
          });

          if (arrayaux!=null) {
            this.allproductos.push(arrayaux);
          }
     
       //onsole.log(this.allproductos);
        });
    
      }
    
      DetalleProd(p):void{
          //console.log(p);
          this.navCtrl.push(DetallePage,p);
      }

      help():void{
        this.navCtrl.push(PrincipalPage);
      }

}
