import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient,public storage: SQLite) {

      if (!this.isOpen) {
        this.storage = new SQLite();
        this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
          this.db = db;
          db.executeSql("CREATE TABLE IF NOT EXISTS productos (id  INT NOT NULL AUTO_INCREMENT , nombre'TEXT NOT NULL , precio FLOAT(10) NOT NULL , estado INT(2) NOT NULL , PRIMARY KEY (id))", []);
          this.isOpen = true;
        }).catch((error) => {
          console.log(error);
        })
      }
  }

}
