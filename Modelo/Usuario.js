const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local: {
    nombre: String,
    email: String,
    password: String,
    direccion: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    password: String
  },
  twitter: {
    id: String,
    token: String,
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    password: String
  }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('Usuario', userSchema);