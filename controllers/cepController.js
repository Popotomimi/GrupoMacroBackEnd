const axios = require("axios");
const Cep = require("../models/Cep");

const getCep = async (req, res) => {
  try {
    const { cep } = req.params;

    let cepData = await Cep.findOne({ cep });

    if (!cepData) {
      const viaCepResponse = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (viaCepResponse.data.erro) {
        return res
          .status(404)
          .json({ message: "CEP não encontrado na API ViaCEP" });
      }

      cepData = new Cep(viaCepResponse.data);
      await cepData.save();
    }

    res.status(200).json(cepData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar o CEP", error: error.message });
  }
};

const updateCep = async (req, res) => {
  try {
    const { cep } = req.params;
    const { logradouro, bairro } = req.body;

    const cepData = await Cep.findOne({ cep });

    if (!cepData) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    if (logradouro) cepData.logradouro = logradouro;
    if (bairro) cepData.bairro = bairro;

    await cepData.save();

    res.status(200).json({ message: "CEP atualizado com sucesso!", cepData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o CEP", error: error.message });
  }
};

const favoriteCep = async (req, res) => {
  try {
    const { cep } = req.params;

    const cepData = await Cep.findOne({ cep });

    if (!cepData) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    cepData.favorito = !cepData.favorito;
    await cepData.save();

    res.status(200).json({
      message: `CEP ${cep} ${
        cepData.favorito ? "favoritado" : "removido dos favoritos"
      } com sucesso!`,
      cepData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao favoritar o CEP", error: error.message });
  }
};

const deleteCep = async (req, res) => {
  try {
    const { cep } = req.params;

    // Busca o CEP no banco
    const cepData = await Cep.findOne({ cep });

    if (!cepData) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    // Remove o CEP do banco
    await Cep.deleteOne({ cep });

    res.status(200).json({ message: `CEP ${cep} removido com sucesso!` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao remover o CEP", error: error.message });
  }
};

const getAllCep = async (req, res) => {
  try {
    const ceps = await Cep.find();
    res.status(200).json(ceps);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar CEPs", error: error.message });
  }
};

module.exports = { getCep, updateCep, favoriteCep, deleteCep, getAllCep };
