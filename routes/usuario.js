const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Usuario} = require('../model/usuario');
let router = express.Router();

router.post('/usuario', (req, res) => {
  let body = _.pick(req.body, ['login', 'senha']);
  let usuario = new Usuario(body);

  usuario.save().then(() => {
    return usuario.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(usuario);
  }).catch((e) => res.status(400).send(e));
});

router.post('/usuario/login', (req,res) => {
  let body = _.pick(req.body, ['login', 'senha']);

  Usuario.findByCredentials(body.login, body.senha).then((usuario) => {
    return usuario.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(usuario);
    });
  }).catch((e) => res.status(401).send());

});

router.get('/usuario/me', autenticar, (req, res) => {
  res.send(req.usuario);
});

router.delete('/usuario/logout', autenticar, (req, res) => {
  req.usuario.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch((e) => res.status(400).send());
});

module.exports = router;
