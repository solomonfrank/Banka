/* eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';
// import Db from '../config/connection';
import Joi from 'joi';
import User from '../models/User';
import Account from '../models/Account';
import Validation from '../helpers/Validation';
import Response from '../helpers/Response';

import Auth from '../helpers/Auth';


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

    const token = await Auth.generateToken(email);

    if (!token) {
      return Response.onError(res, 500, 'Internal server errr due to token');
    }

    const body = {
      firstName, lastName, email, gender, password, token,
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

      return Response.onError(res, 500, 'Internal server error');
    }
  }

  static async signin(req, res) {
    const schema = Validation.init().validateSignin();
    const clean = Joi.validate(req.body, schema);
    if (clean.error) {
      return Response.onError(res, 400, clean.error.details[0].message);
    }
    const { email, password } = clean.value;
    const body = { email };
    try {
      const result = await User.init().find(body);
      if (!result.rows[0]) {
        return Response.onError(res, 400, 'invalid credential');
      }
      const hashPassword = result.rows[0].password;
      const pass = await Validation.init().verifyPassword(password, hashPassword);
      if (!pass) {
        return Response.onError(res, 400, 'invalid email or password');
      }
      const payload = {
        id: result.rows[0].id,
        type: result.rows[0].type,

      };
      result.rows[0].token = await Auth.generateToken(payload, res);

      return Response.onSuccess(res, 200, result.rows[0]);
    } catch (error) {
      return Response.onError(res, 500, 'internal server error');
    }
  }

  static async create(req, res) {
    const schema = Validation.init().validateCreateAccount();
    const clean = Joi.validate(req.body, schema);
    if (clean.error) {
      return Response.onError(res, 400, clean.error.details[0].message);
    }

    const { id } = req.userData;
    // const user = await User.init().getById(id);


    const {
      phone, address, balance, type,
    } = clean.value;
    const status = balance === 0 ? 'dormant' : 'active';

    const accountNum = Math.floor((1 + Math.random()) * 1000000);
    req.body.accountNum = accountNum;

    const body = {
      phone, address, balance, type, status,
    };
    body.userId = id;
    body.status = status;
    body.accountNum = accountNum;
    body.createdOn = new Date();

    try {
      const result = await Account.init().insert(body);

      return Response.onSuccess(res, 201, result.rows[0]);
    } catch (err) {
      return Response.onError(res, 500, 'Internal server Error');
    }
  }
}


export default UserController;
