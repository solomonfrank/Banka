/* eslint-disable no-underscore-dangle */
import Db from '../config/connection';
import Model from './Model';

const pool = Db.getInstance();
class Account extends Model {
  constructor(modelType = 'account') {
    super(modelType);
    this._table = modelType;
    this._userTable = 'users';
  }

  async findByAccount(accountNum, field) {
    this.field = field;
    this.account = accountNum;

    this.sql = `SELECT accountNumber,type,balance,createdOn, useerId ,firstName, lastName,email FROM ${this._table}
      JOIN ${this.userTable}
      ON ${this._table}.userId = ${this._userTable}
      WHERE accountNumber = $1`;
    const client = await pool;

    return client.query(`${this.sql}`, [this.id]);
  }

  static init() {
    return new Account();
  }
}
export default Account;
