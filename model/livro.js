const mongoose = require('mongoose');

let assuntoSchema = mongoose.Schema({
  assunto: {
    type: String,
    trim: true
  }
}, {_id: false});

let estoqueSchema = mongoose.Schema({
  quantidade: {
    type: Number,
    required: true
  },
  local: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Local'
  }
});

let livroSchema = mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  ano: {
    type: Number,
    required: true
  },
  autores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: 'Autor'
    }
  ],
  assuntos: [ assuntoSchema ],
  estoque: [ estoqueSchema ],
  paginas: {
    type: Number,
    required: true
  },
  peso: {
    type: String,
    trim: true
  },
  formato: {
    type: String,
    trim: true
  },
  valor_venda: {
    type: Number
  },
  ean: {
    type: String,
    trim: true
  }
});

let Livro = mongoose.model('Livro', livroSchema);

module.exports = { Livro };
