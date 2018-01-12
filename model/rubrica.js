const mongoose = require('mongoose');

let Rubrica = mongoose.model('Rubrica', {
  codigo: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  tipo: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = { Rubrica };
