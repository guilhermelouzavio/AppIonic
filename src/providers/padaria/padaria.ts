import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PadariaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(padaria: Padaria) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into padarias (nome, endereco, telefone, email, cnpj) values (?, ?, ?, ?, ?)';
        let data = [padaria.nome, padaria.endereco, padaria.telefone, padaria.email, padaria.cnpj];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(padaria: Padaria) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update padarias set nome = ? , endereco = ? , telefone = ? , email = ? , cnpj = ?  ';
        let data = [padaria.nome, padaria.endereco, padaria.telefone, padaria.email, padaria.cnpj, padaria.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public remover(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from padarias where id =?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from padarias where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let padaria = new Padaria();
              padaria.id = item.id;
              padaria.nome = item.nome;
              padaria.endereco = item.endereco;
              padaria.telefone = item.telefone;
              padaria.email = item.email;
              padaria.cnpj = item.cnpj;

              return padaria;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        return db.executeSql('select * from padarias', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let padarias: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var padaria = data.rows.item(i);
                padarias.push(padaria);
              }
              return padarias;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Padaria {
  id: number;
  nome: string;
  endereco: string;
  telefone: number;
  email: string;
  cnpj: number;
}
