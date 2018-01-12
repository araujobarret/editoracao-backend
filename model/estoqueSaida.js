const mongoose = require('mongoose');

let EstoqueSaida = mongoose.model('EstoqueSaida', {
  quantidade: {
    type: Number,
    required: true
  },
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Livro'
  },
  rubrica: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Rubrica'
  }
});

module.exports = { EstoqueSaida };
