const mongoose = require('mongoose');

let Estoque = mongoose.model('Estoque', {
  quantidade: {
    type: Number,
    required: true
  },
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Livro'
  },
  local: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Local'
  }
});

module.exports = { Estoque };
