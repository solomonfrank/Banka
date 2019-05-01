
import Model from './Model';
import Db from '../config/connection';

class User extends Model {
  constructor(modelName = 'users') {
    super(modelName);
  }
}

export default User;
