const mongoose = require('mongoose');

let Local = mongoose.model('Local', {
  descricao: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  _idSubLocal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Local',
    required: false
  }
});

module.exports = { Local };
