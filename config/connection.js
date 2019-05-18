/* eslint-disable no-console */


import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL;


class Db {
  constructor() {
    this.conn = new Pool({
      connectionString,
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
  token TEXT NOT NULL,
  createdAt TIMESTAMP
  
  
    );
    `;

    Db.getInstance(this.createTableQuery).catch(err => console.log(err));
  }

  static createUserAccountTable() {
    this.queryText = `
CREATE TABLE IF NOT EXISTS
 account(
   id SERIAL PRIMARY KEY,
   accountNum INT UNIQUE NOT NULL,
   address TEXT NOT NULL,
   type VARCHAR NOT NULL,
   status VARCHAR NOT NULL,
   balance FLOAT NOT NULL,
   phone INT NOT NULL,

   createdOn  TIMESTAMP,
   userId INT REFERENCES users ON DELETE CASCADE
 );

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
       amount FLOAT NOT NULL,
       oldBalance FLOAT NOT NULL,
       newBalance FLOAT NOT NULL
     );
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
