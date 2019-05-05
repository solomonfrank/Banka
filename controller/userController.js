/* eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';
// import Db from '../config/connection';
import Joi from 'joi';
import User from '../models/User';
import Validation from '../helpers/Validation';
import Response from '../helpers/Response';

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

class UserController {
  static async signup(req, res) {
    const schema = Validation.init().validateRegister();

    const clean = Joi.validate(req.body, schema);
    if (clean.error) {
      return Response.onError(res, 400, clean.error.details[0].message);
    }

    const {
      firstName, lastName, email, gender, password,
    } = clean.value;
    const body = {
      firstName, lastName, email, gender, password,
    };
    body.password = await Validation.init().hashPassword(password);
    body.createdAt = new Date();


    try {
      const result = await User.init().insert(body);

      return Response.onSuccess(res, 201, result.rows[0]);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return Response.onError(res, 400, 'email already exist');
      }

      return Response.onError(res, 400, 'internal Server Error');
    }
  }
}

export default UserController;
