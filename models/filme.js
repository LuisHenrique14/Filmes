const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilmeSchema = new Schema(
    {
        filme: {type: String, required: true, maxLength: 100},
        usuario: {type: String, required: true},
    }
);

module.exports = mongoose.model('Filme', FilmeSchema);
