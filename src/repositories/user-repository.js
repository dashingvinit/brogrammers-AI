const CrudRepository = require('./crud-repository');
const User = require('../models/user-model');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      email: email,
    });
    return user;
  }

  async getAllAdmin() {
    const admins = await User.find({ role: 'admin' });
    return admins;
  }
}

module.exports = UserRepository;
