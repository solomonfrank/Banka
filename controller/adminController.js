
import express from 'express';
import bodyParser from 'body-parser';
// import Db from '../config/connection';
import Joi from 'joi';
import User from '../models/User';
// import Account from '../models/Account';
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

class AdminController {
  static async createAdmin(req, res) {
    const schema = Validation.init().validateAdmin();

    const clean = Joi.validate(req.body, schema);
    if (clean.error) {
      return Response.onError(res, 400, clean.error.details[0].message);
    }
    const token = await Auth.generateToken(clean.value.email);
    const body = { ...clean.value, token };
    delete body.confirmPassword;


    body.password = await Validation.init().hashPassword(body.password);
    body.createdAt = new Date();


    try {
      const result = await User.init().insert(body);

      return Response.onSuccess(res, 201, result.rows[0]);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return Response.onError(res, 400, 'email already exist');
      }

      return Response.onError(res, 500, 'internal Server Error');
    }
  }
}
export default AdminController;
