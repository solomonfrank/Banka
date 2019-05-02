import Db from '../config/connection';
import Model from './Model';

class User extends Model {
  constructor(modelType = 'users') {
    super(modelType);
  }
}

export default User;
