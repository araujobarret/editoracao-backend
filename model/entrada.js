const mongoose = require('mongoose');

let Entrada = mongoose.model('Entrada', {
  ne: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  nf: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  numeroProcesso: {
    type: String,
    minlength: 6,
    required: true,
    trim: true
  },
  data: {
    type: Date,
    required: true
  },
  descricao: {
    type: String,
    trim: true
  },
  livros: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Livro'
  }],
  rubrica: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Rubrica'
  }
});

module.exports = { Entrada};
