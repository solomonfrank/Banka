
import jwt from 'jsonwebtoken';
import Response from './Response';
// import Model from '../models/Model';
import User from '../models/User';

const Auth = {

  async generateToken(data) {
    const token = await jwt.sign({
      key: data,
    }, process.env.SECRET_KEY);

    return token;
  },

  // eslint-disable-next-line consistent-return
  async verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];

    token = token.trim();

    if (!token) {
      return Response.onError(res, 400, 'Token not found');
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
};
export default Auth;
