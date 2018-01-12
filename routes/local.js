const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Local} = require('../model/local');
let router = express.Router();

router.post('/local', autenticar, (req, res) => {
  let body = _.pick(req.body, ['descricao', '_idSubLocal']);
  let local = new Local({
    descricao: body.descricao,
    _idSubLocal: body._idSubLocal
  });

  local.save()
    .then((local) => res.status(200).send(local))
    .catch((e) => res.status(400).send(e));

});

router.get('/local', (req, res) => {
  let body = _.pick(req.query, ['descricao']);

  Local.find(body)
    .populate('_idSubLocal')
    .then((locais) => {
      res.send(locais);
    })
    .catch((e) => res.status(400).send(e));
});

router.patch('/local/:id', autenticar, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['descricao', '_idSubLocal']);
  let unset = {};

  if(!ObjectID.isValid(id))
    res.status(404).send();

  if(body._idSubLocal){
    if(!ObjectID.isValid(body._idSubLocal))
      res.status(404).send();
  }
  else {
    unset['_idSubLocal'] = "";
  }

  if(_.isEmpty(unset)) {
    Local.findByIdAndUpdate(id, {
       $set: body
     }, {new: true})
      .then((local) => res.send(local))
      .catch((e) => res.status(400).send(e));
  }
  else {
    Local.findByIdAndUpdate(id, {
       $set: body,
       $unset: unset
     }, {new: true})
      .then((local) => res.send(local))
      .catch((e) => res.status(400).send(e));
  }
});

module.exports = router;
