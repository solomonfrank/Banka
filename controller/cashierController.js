/* eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';

import Transaction from '../models/Transaction';
import Account from '../models/Account';

import Response from '../helpers/Response';


const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

class CashierController {
  static async debitAccount(req, res) {
    const { accountNum } = req.params;
    const { amount } = req.body;
    const { id: cashierId } = req.userData;

    const transType = 'debit';
    CashierController.transact(res, accountNum, amount, transType, cashierId);
  }


  static async creditAccount(req, res) {
    const { accountNum } = req.params;
    const { amount } = req.body;
    const { id: cashierId } = req.userData;
    const transType = 'credit';
    CashierController.transact(res, accountNum, amount, transType, cashierId);
  }

  static async transact(res, accountNum, amount, transType, cashierId) {
    const result = await Account.init().findByAccount(accountNum, '*');

    if (!result.rows[0]) {
      return Response.onError(res, 404, 'Account not found');
    }
    const { balance, userid: userId, accountnum: accountnumber } = result.rows[0];
    const oldBalance = balance;
    let newBalance;
    if (transType === 'credit') {
      newBalance = oldBalance + amount;
    } else if (transType === 'debit') {
      if (oldBalance <= amount) {
        return Response.onError(res, 200, 'You have insufficient balance');
      }
      newBalance = oldBalance - amount;
    }

    const createdOn = new Date();
    const body = {
      userId,
      accountnumber,
      newBalance,
      oldBalance,
      cashierId,
      type: transType,
      createdOn,
      amount,

    };

    try {
      const trans = await Transaction.init().insert(body);
      if (trans.rows[0]) {
        const newAccountBalance = { balance: trans.rows[0].newbalance };
        const output = await Account.init().update(accountNum, newAccountBalance);

        const responseBody = {
          transactionId: trans.rows[0].id,
          accountNum: output.rows[0].accountnum,
          amount,
          cashierId,
          transactionType: trans.rows[0].type,
          accountBalance: output.rows[0].balance.toString(),


        };
        return Response.onSuccess(res, 200, responseBody);
      }
    } catch (error) {
      return Response.onSuccess(res, 500, 'Internal server error');
    }
  }
}


export default CashierController;
