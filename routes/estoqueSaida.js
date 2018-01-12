const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let { EstoqueSaida } = require('../model/estoqueSaida');
let router = express.Router();

router.post('/estoqueSaida/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['quantidade', 'livro', 'rubrica']);
  let estoqueSaida;

  if(!ObjectID.isValid(body.livro) || !ObjectID.isValid(body.rubrica))
    res.status(404).send();

  estoqueSaida = new EstoqueSaida(body);

  estoqueSaida.save()
    .then((estoque) => res.send(estoque))
    .catch((e) => res.status(400).send(e));
});

router.get('/estoqueSaida/', (req, res) => {
  let body = _.pick(req.query, ['quantidade', 'livro', 'rubrica']);

  EstoqueSaida.find(body)
    .populate('livro rubrica')
    .then((estoque) => res.send(estoque))
    .catch((e) => res.status(400).send(e));
});

module.exports = router;
