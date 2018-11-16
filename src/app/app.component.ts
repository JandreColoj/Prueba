import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//import { PrincipalPage } from '../pages/principal/principal';
import { ListprodPage } from '../pages/listprod/listprod';
import { WebserviceProvider } from '../providers/webservice/webservice';
//import { DetallePage } from '../pages/detalle/detalle';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //rootPage: any = PrincipalPage;

  public categorias: any;
  public productos: any;
  public categoriaPadre: any;
  public listCategoria: any;
  public menu: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public ws: WebserviceProvider
                          
            ) {// used for an example of ngFor and navigation

    
    
     this.ws.getCategorias().then((result: any) =>{
        
        this.categorias=result.data;
        this.categoriaPadre=[];
        this.menu=[];
        console.log(this.categorias);

        /*Guarda las categorias padres */
        this.categorias.forEach(element => {
          if (element.parent_id==0) {
            this.categoriaPadre.push({id:element.category_id, title: element.nombre});
          }               
          
        });

        console.log(this.categoriaPadre);

        /*CREA EL MENU */
        this.categoriaPadre.forEach(element => {

            this.listCategoria=[];

            this.categorias.forEach(data => {
                if (element.id==data.parent_id || element.id==data.category_id) {
                  if(data.contar==0){

                    if (data.parent==null) {
                        data.parent=data.nombre;
                    }
                    this.listCategoria.push({id:data.category_id, title: data.nombre, parent: data.parent_id, cat_padre: data.parent, component: ListprodPage});
                  }
                  
                }  
            }); 
            
            this.menu.push(this.listCategoria);
          
        });

        console.log(this.menu);


    });

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page,id_categoria) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    localStorage.setItem("G_nombreCategoria", page.title);
    console.log(page.title);
    this.nav.setRoot(page.component,{id : id_categoria, nombre : page.title});
    
    
  }

  GetOut(){
   // navigator['app'].exitApp();   
   this.nav.setRoot(LoginPage); 
  }
}
