import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage } from '../pages/principal/principal';
import { DetallePage } from '../pages/detalle/detalle';
import { ListprodPage } from '../pages/listprod/listprod';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';

/*PROVIDERS */
import { HttpClientModule } from '@angular/common/http';
import { WebserviceProvider } from '../providers/webservice/webservice';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PrincipalPage,
    DetallePage,
    ListprodPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PrincipalPage,
    DetallePage,
    ListprodPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    WebserviceProvider,
    /*verificar conexion  a internet */
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    DatabaseProvider
  ]
})
export class AppModule {}
