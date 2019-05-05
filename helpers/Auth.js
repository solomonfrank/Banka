
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
    const token = req.header['x-access-token'];
    console.log(token);
    if (!token) {
      return Response.onError(res, 400, 'Token not found');
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const { userId } = decoded.key.data;
      const result = await User.init().findById(userId, '*');
      if (!result.rows[0]) {
        return Response.onError(res, 400, 'invalid token provided');
      }
      req.userData = decoded.key;
      next();
    } catch (err) {
      return Response.onError(res, 500, 'Internal server error');
    }
  },
};
export default Auth;
