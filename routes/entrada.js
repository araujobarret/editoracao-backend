const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Entrada} = require('../model/entrada');
let {Estoque} = require('../model/estoque');
let {EstoqueSaida} = require('../model/estoqueSaida');
let router = express.Router();

router.post('/entrada/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['ne', 'nf', 'numeroProcesso', 'data', 'descricao', 'rubrica']);
  let livros = _.pick(req.body, ['livros']);
  let estoques = _.pick(req.body, ['estoques']);
  let estoqueSaidas = _.pick(req.body, ['estoqueSaidas']);

  let entrada = new Entrada(body);

  // Check if the ID's are valid and are not empty
  if(_.isEmpty(livros) || _.isEmpty(estoques) || _.isEmpty(estoqueSaidas)){
    res.status(404).send();
  }

  for(livro of livros.livros){
    if(!ObjectID.isValid(livro.livro)){
      res.status(404).send();
    }
    entrada.livros.addToSet(livro.livro);
  }

  for(estoque of estoques.estoques){
    if(!ObjectID.isValid(estoque.livro) || !ObjectID.isValid(estoque.local)){
      res.status(404).send();
    }
  }

  for(estoque of estoqueSaidas.estoqueSaidas){
    if(!ObjectID.isValid(estoque.livro) || !ObjectID.isValid(estoque.rubrica)){
      res.status(404).send();
    }
  }

  Estoque.insertMany(estoques.estoques)
    .then((estoques) => {
      return entrada.save();
    })
    .then((entrada) => {
      return EstoqueSaida.insertMany(estoqueSaidas.estoqueSaidas);
    })
    .then((estoques) => res.send(entrada))
    .catch((e) => res.status(400).send(e));
});

router.get('/entrada/', (req, res) => {
  
});

module.exports = router;
