
import express from 'express';
import bodyParser from 'body-parser';
// import Db from '../config/connection';
import Joi from 'joi';
import User from '../models/User';
import Account from '../models/Account';
import Validation from '../helpers/Validation';
import Response from '../helpers/Response';

import Auth from '../helpers/Auth';
// import Model from '../models/Model';


const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

class StaffController {
  static async activate(req, res) {
    const { status } = req.body;
    const { accountNum } = req.params;
    // const body = { accountNum, status };


    try {
      const result = await Account.init().update(accountNum, { status });


      return Response.onSuccess(res, 200, result.rows[0]);
    } catch (err) {
      return Response.onError(res, 200, 'Internal server error');
    }
  }

  static async getAccount(req, res) {
    const { accountNum } = req.params;
    try {
      const result = await Account.init().findByAccount(accountNum, '*');
      if (!result.rows[0]) {
        return Response.onError(res, 404, 'account number does not exist');
      }

      return Response.onSuccess(res, 200, result.rows[0]);
    } catch (error) {
      return Response.onError(res, 200, 'Internal server error');
    }
  }

  static async deleteAccount(req, res) {
    const { accountNum } = req.params;
    try {
      const result = await Account.init().delete(accountNum);

      return Response.onSuccess(res, 200, 'Account delete successfully');
    } catch (error) {
      return Response.onError(res, 200, 'Internal server error');
    }
  }
}


export default StaffController;
