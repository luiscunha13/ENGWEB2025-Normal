const mongoose = require('mongoose');

const edicaoSchema = new mongoose.Schema({
  _id: { type: Number, required: true},
  id: { type: String, required: true, unique: true },
  anoEdição: { type: String, required: true },
  organizacao: { type: String, required: true },
  vencedor: { type: String, required: true },
  musicas: [{
    id: String,
    link: String,
    título: String,
    país: String,
    compositor: String,
    intérprete: String,
    letra: String
  }]
});

module.exports = mongoose.model('edicoes', edicaoSchema);