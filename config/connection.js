

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


class Db {
  constructor() {
    this.conn = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.HOST,
      database: process.env.DB_NAME,
    });
    return this.conn;
  }

  static async getInstance() {
    this.pool = new Db();


    return this.pool;

    // console.log(this.client);
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
