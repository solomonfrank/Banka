

import { Pool } from 'pg';


class Db {
  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      password: 'ifeyinwa5',
      host: 'localhost',
      database: 'Banka',
    });

    return (async () => {
      this.conn = await this.pool.connect(); // checkout a client
      console.log('connected');
      return this.conn;
    })();
  }

  static async getInstance(queryText) {
    this.client = await new Db();
    this.result = await this.client.query(queryText);
    this.client.end();

    console.log(this.result);
  }

  static createUsersTable() {
    this.createTableQuery = `
    CREATE TABLE IF NOT EXISTS
    users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(120) NOT NULL,
  lastName VARCHAR(120) NOT NULL,
  gender VARCHAR (20) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  type VARCHAR(128) DEFAULT 'client',
  isAdmin BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP
  
  
    )
    `;

    Db.getInstance(this.createTableQuery).catch(err => console.log(err));
  }

  static createUserAccountTable() {
    this.queryText = `
CREATE TABLE IF NOT EXISTS
 account(
   id SERIAL PRIMARY KEY,
   accountNumber INT UNIQUE NOT NULL,
  
   type VARCHAR NOT NULL,
   status VARCHAR NOT NULL,
   balance TEXT NOT NULL,
   createdOn  TIMESTAMP,
   userId INT REFERENCES users ON DELETE CASCADE


 )

`;

    Db.getInstance(this.queryText).catch(err => console.log(err));
  }

  static createTransactionTable() {
    this.queryText = `
    CREATE TABLE IF NOT EXISTS 
     transaction(
       id SERIAL PRIMARY KEY,
       createdOn TIMESTAMP,
       type VARCHAR(90) NOT NULL,
       accountNumber INT NOT NULL,
       userId INT REFERENCES users NOT NULL,
       cashierId INT REFERENCES users NOT NULL,
       amount NUMERIC(10,2) NOT NULL,
       oldBalance NUMERIC (10) NOT NULL,
       newBalance NUMERIC(10) NOT NULL
     )
    `;

    Db.getInstance(this.queryText).catch(err => console.log(err));
  }

  static dropTableUsers() {
    this.queryText = 'DROP TABLE IF EXISTS users';
    Db.getInstance(this.queryText).catch(err => console.log(err));
  }

  static dropTableAccount() {
    this.queryText = 'DROP TABLE IF EXISTS account';
    Db.getInstance(this.queryText);
  }

  static dropTableTransaction() {
    this.queryText = 'DROP TABLE IF EXISTS transaction';
    Db.getInstance(this.queryText);
  }

  // create all table

  static createAllTable() {
    Db.createUsersTable();
    Db.createTransactionTable();
    Db.createUserAccountTable();
  }

  static dropAllTable() {
    Db.dropTableUsers();
    Db.dropTableAccount();
    Db.dropTableTransaction();
  }
}


export default Db;
