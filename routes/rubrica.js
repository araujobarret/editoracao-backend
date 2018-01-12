const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Rubrica} = require('../model/rubrica');
let router = express.Router();

router.post('/rubrica/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['codigo', 'descricao', 'tipo']);
  let rubrica = new Rubrica(body);

  rubrica.save()
    .then((rubrica) => res.send(rubrica))
    .catch((e) => res.status(400).send(e));
});

router.get('/rubrica/', (req, res) => {
  let body = _.pick(req.query, ['_id', 'codigo', 'descricao', 'tipo']);

  Rubrica.find(body)
    .then((rubricas) => res.send(rubricas))
    .catch((e) => res.status(400).send(e));
});

router.patch('/rubrica/:id', autenticar,(req, res) => {
  let body = _.pick(req.body, ['codigo', 'descricao', 'tipo']);
  let id = req.params.id;

  if(!ObjectID.isValid(id))
    res.status(404).send();

  Rubrica.findByIdAndUpdate(id, body, {new: true})
    .then((rubrica) => res.send(rubrica))
    .catch((e) => res.status(400).send(e));
});

module.exports = router;
