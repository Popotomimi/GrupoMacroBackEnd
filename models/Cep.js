const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Cep = mongoose.model(
  "Cep",
  new Schema(
    {
      cep: { type: String, required: true, unique: true },
      logradouro: { type: String, required: true },
      complemento: { type: String },
      bairro: { type: String, required: true },
      localidade: { type: String, required: true },
      uf: { type: String, required: true },
      ibge: { type: String },
      gia: { type: String },
      ddd: { type: String },
      siafi: { type: String },
      favorito: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);

module.exports = Cep;
