let {Usuario} = require('./../model/usuario');

let autenticar = (req, res, next) => {
  let token = req.header('x-auth');

  Usuario.findByToken(token).then((usuario) => {
    if(!usuario){
      return Promise.reject();
    }

    req.usuario = usuario;
    req.token = token;
    next();
  }).catch((e) => res.status(401).send(e));
};

module.exports = {autenticar};
