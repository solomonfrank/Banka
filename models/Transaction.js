/* eslint-disable no-underscore-dangle */
import Db from '../config/connection';
import Model from './Model';

const pool = Db.getInstance();
class Transaction extends Model {
  constructor(modelType = 'users') {
    super(modelType);
    this._table = modelType;
  }

  async findTransactByAccount(param, field = '*') {
    this.field = field;
    this.accountNumber = param;
    this.sql = `SELECT ${this.field} FROM ${this._table} WHERE accountNumber = $1`;
    const client = await pool;
    return client.query(this.sql, [this.accountNumber]);

  }

  static init() {
    return new Transaction();
  }

}
export default Transaction;
