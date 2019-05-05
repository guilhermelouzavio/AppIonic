import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB(){
    return this.sqlite.create({
      name: 'padarias.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS padarias (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT,  endereco TEXT , telefone integer, email TEXT, cnpj integer )']
    ])
      .then(() => console.log('Tabela criada'))
      .catch(e => console.error('Erro ao criar a tabela', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from padarias', [])
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into padarias (nome) values (?)', ['Sao Jorge']],
            ['insert into padarias (endereco) values (?)', ['rua dolores santos']],
            ['insert into padarias (telefone) values (?)', ['58419999']],
            ['insert into padarias (email) values (?)', ['SaoJorge@gmail.com']],
            ['insert into padarias (cnpj) values (?)', ['9088789687']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }
}


