const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let tokenSchema = mongoose.Schema({
  access: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
}, { _id: false });

let usuarioSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} não é um email válido'
    }
  },
  senha: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [ tokenSchema ]
});

usuarioSchema.methods.generateAuthToken = function(){
  let usuario = this;
  let access = 'auth';
  let token = jwt.sign({_id: usuario._id.toHexString(), access}, 'editoracao123').toString();

  usuario.tokens.push({access, token});

  return usuario.save().then(() => {
    return token;
  });
};

usuarioSchema.methods.removeToken = function(token){
  let usuario = this;

  return usuario.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
}

usuarioSchema.methods.toJSON = function(){
  let usuario = this;
  let usuarioObj = usuario.toObject();

  return _.pick(usuarioObj, ['_id', 'login']);
};

usuarioSchema.statics.findByToken = function(token) {
  let Usuario = this;
  let decoded;

  try{
    decoded = jwt.verify(token, 'editoracao123');
  }
  catch(e){
    return Promise.reject();
  }

  return Usuario.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

usuarioSchema.statics.findByCredentials = function(login, senha) {
  let Usuario = this;
  return Usuario.findOne({login}).then((usuario) => {
    if(!usuario)
      return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(senha, usuario.senha, (err, res) => {
        if(res)
          resolve(usuario);
        else
          reject();
      });
    });
  });
};

usuarioSchema.pre('save', function(next) {
  let usuario = this;

  if(usuario.isModified('senha', usuarioSchema)){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(usuario.senha, salt, (err, hash) => {
        usuario.senha = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

let Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario
}
