const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Estoque} = require('../model/estoque');
let router = express.Router();

module.exports = router;
