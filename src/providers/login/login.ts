import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
public apiUrl: any;

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');   
  }

  getUsers(usuario, password) {

    this.apiUrl='http://74.207.233.164/PreciosSuper/Controller/LoginUser.php';
    let data = {username: usuario, password: password};

    //opcional
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return new Promise(resolve => {      
      this.http.post(this.apiUrl,JSON.stringify(data),options)
       .subscribe(data => {
          resolve(data);
          //console.log(data);
      }, error => {
          console.log("Error al consumir el web service!");
      });
     
    });

  }  


}


      /*this.http.get(this.apiUrl+"").subscribe(data => {
        resolve(data);
        //console.log(data.user[0].nombre_usuario);
      }, err => {
        console.log(err);
      });*/