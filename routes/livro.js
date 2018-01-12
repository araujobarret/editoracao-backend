const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Livro} = require('../model/livro');
let router = express.Router();

router.post('/livro', autenticar, (req, res) => {
  let body = _.pick(req.body, ['isbn', 'titulo', 'ano', 'paginas', 'peso', 'formato', 'valor_venda', 'ean']);
  let autores = _.pick(req.body, ['autores']);
  let assuntos = _.pick(req.body, ['assuntos']);

  let livro = new Livro(body);

  if(!_.isEmpty(autores)) {
    for(autor of autores.autores) {
      if(!ObjectID.isValid(autor._idAutor)){
        res.status(404).send();
      }
      livro.autores.addToSet(autor._idAutor);
    }
  }

  if(!_.isEmpty(assuntos)) {
    for(assunto of assuntos.assuntos)
      livro.assuntos.addToSet(assunto);
  }

  livro.save()
     .then((livro) => res.send(livro))
     .catch((e) => res.status(400).send(e));
});

router.get('/livro', (req, res) => {
  let body = _.pick(req.query, ['isbn', 'titulo', 'ano', 'paginas', 'peso', 'formato', 'valor_venda', 'ean']);

  Livro.find(body)
    .populate('autores')
    .then((livros) => res.send(livros))
    .catch((e) => res.status(400).send(e));
});

router.get('/livro/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id))
    res.status(404).send();

  Livro.findById(id)
    .then((livro) => {
      if(!livro)
        res.status(404).send();

      res.send(livro);
    }).catch((e) => res.status(400).send(e));
});

router.patch('/livro/:id', autenticar, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.query, ['isbn', 'titulo', 'ano', 'paginas', 'peso', 'formato', 'valor_venda', 'ean']);
  let autores = _.pick(req.body, ['autores']);
  let assuntos = _.pick(req.body, ['assuntos']);
  let unset = {
    isbn: "",
    titulo: "",
    ano: "",
    paginas: "",
    peso: "",
    formato: "",
    valor_venda: "",
    ean: "",
    autores: {},
    assuntos: {}
  };

  if(!ObjectID.isValid(id))
    res.status(404).send();

  for(key in params){
    delete unset[key];
  }

  if(_.isEmpty(unset)) {
    Livro.findByIdAndUpdate(id, {$set: body}, {new: true})
      .then((livro) => res.send(livro))
      .catch((e) => res.status(400).send(e));
  }
  else {
    Livro.findByIdAndUpdate(id, {$set: body, $unset: unset}, {new: true})
      .then((livro) => res.send(livro))
      .catch((e) => res.status(400).send(e));
  }
});

module.exports = router;
