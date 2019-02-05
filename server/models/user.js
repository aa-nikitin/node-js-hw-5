const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true
  },
  surName: {
    type: String
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  hash: {
    type: String,
    required: [true, 'Password required']
  },
  access_token: {
    type: String
  },
  permissionId: {
    type: String,
    required: true,
    unique: true
  },
  permission: { type: Schema.Types.ObjectId, ref: 'permission' }
  // per: { type: Schema.Types.ObjectId, ref: 'Permission' }
});

userSchema.methods.setPassword = function(password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.hash);
};

userSchema.methods.setToken = function(token) {
  this.access_token = token;
};

module.exports = mongoose.model('user', userSchema);

// module.exports = mongoose.model('user', userSchema);
