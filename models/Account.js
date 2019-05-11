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

    this.sql = `SELECT acc.accountnum,acc.type,acc.status,acc.balance,acc.createdOn, acc.userid ,u.id,u.firstname, u.lastname,u.email ,u.type FROM ${this._table} acc
      JOIN ${this._userTable} u
      ON acc.userid = u.id
      WHERE accountnum = $1`;
    const client = await pool;

    return client.query(`${this.sql}`, [this.account]);
  }

  static init() {
    return new Account();
  }
}
export default Account;
