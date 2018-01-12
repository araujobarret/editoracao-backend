const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Autor} = require('../model/autor');
let router = express.Router();

router.post('/autor/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['nome']);
  let autor = new Autor(body);

  autor.save()
    .then((autor) => res.send(autor))
    .catch((e) => res.status(400).send(e));
});

router.get('/autor/', (req, res) => {
  let body = _.pick(req.query, ['_id', 'nome']);

  Autor.find(body)
    .then((autor) => res.send(autor))
    .catch((e) => res.status(400).send());
});

router.patch('/autor/:id', autenticar, (req, res) => {
  let body = _.pick(req.body, ['nome']);
  let id = req.params.id;

  if(!ObjectID.isValid(id))
    res.status(404).send();

    Autor.findByIdAndUpdate(id, body, {new: true})
      .then((autor) => res.send(autor))
      .catch((e) => res.status(400).send(e));
});

module.exports = router;
