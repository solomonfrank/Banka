/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';
import Response from './Response';
// import Model from '../models/Model';
import User from '../models/User';

const Auth = {

  async generateToken(data) {
    try {
      const token = await jwt.sign({
        key: data,
      }, process.env.SECRET_KEY);

      return token;
    } catch (err) {
      return false;
    }
  },

  // eslint-disable-next-line consistent-return
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    // token = token.trim();

    if (!token) {
      return Response.onError(res, 400, 'Not authorize to access the page');
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      const { id } = decoded.key;

      const params = { id };

      const result = await User.init().find(params);

      if (!result.rows[0]) {
        return Response.onError(res, 400, 'invalid token provided');
      }


      req.userData = params;
      next();
    } catch (err) {
      return Response.onError(res, 500, 'Internal server error');
    }
  },

  async verifyCashier(req, res, next) {
    const { id } = req.userData;
    const param = { id };
    try {
      const result = await User.init().find(param);

      if (result.rows[0].type !== 'cashier') {
        return Response.onError(res, 403, 'forbidden');
      }
      req.userData = { id };
      next();
    } catch (error) {
      return Response.onError(res, 500, 'server error');
    }
  },
  async verifyStaff(req, res, next) {
    const { id } = req.userData;
    const param = { id };
    try {
      const result = await User.init().find(param);

      const { type, isadmin: isAdmin } = result.rows[0];
      if (type !== 'staff' && !isAdmin) {
        return Response.onError(res, 403, 'forbidden');
      }
      req.userData = { id };
      next();
    } catch (error) {
      return Response.onError(res, 500, 'server error');
    }
  },
};
export default Auth;
