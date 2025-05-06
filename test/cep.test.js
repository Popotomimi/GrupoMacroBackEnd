const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../index"); // Importando o app corretamente
const Cep = require("../models/Cep");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.disconnect(); // Fecha qualquer conexão ativa antes de iniciar os testes
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect(); // Fecha a conexão ao final dos testes
  await mongoServer.stop();
});

describe("Testando API de CEP", () => {
  it("Deve buscar um CEP e salvar no banco", async () => {
    const response = await request(app).get("/api/cep/01001000");
    expect(response.status).toBe(200);
    expect(response.body.cep.replace("-", "")).toBe("01001000"); // ✅ Corrigido para remover o hífen

    const cepDb = await Cep.findOne({ cep: "01001000" });
    expect(cepDb).not.toBeNull();
  });

  it("Deve atualizar logradouro e bairro de um CEP", async () => {
    await new Cep({
      cep: "12345678",
      logradouro: "Rua Antiga",
      bairro: "Bairro Antigo",
      localidade: "Cidade Exemplo",
      uf: "SP", // ✅ Adicionado para evitar erro de validação
    }).save();

    const response = await request(app)
      .put("/api/cep/12345678")
      .send({ logradouro: "Rua Nova", bairro: "Bairro Novo" });

    expect(response.status).toBe(200);
    expect(response.body.cepData.logradouro).toBe("Rua Nova");

    const cepDb = await Cep.findOne({ cep: "12345678" });
    expect(cepDb.logradouro).toBe("Rua Nova");
  });

  it("Deve favoritar um CEP", async () => {
    await new Cep({
      cep: "87654321",
      favorito: false,
      logradouro: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      localidade: "Cidade Exemplo",
      uf: "SP", // ✅ Adicionado para evitar erro
    }).save();

    const response = await request(app).post("/api/cep/favorite/87654321");
    expect(response.status).toBe(200);
    expect(response.body.cepData.favorito).toBe(true);
  });

  it("Deve excluir um CEP", async () => {
    await new Cep({
      cep: "11223344",
      logradouro: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      localidade: "Cidade Exemplo",
      uf: "SP",
    }).save();

    // 🔥 Certifique-se de que o CEP existe antes de excluir
    const cepExistente = await Cep.findOne({ cep: "11223344" });
    expect(cepExistente).not.toBeNull(); // ✅ Agora garantimos que o CEP está salvo

    const response = await request(app).delete("/api/cep/favorite/11223344");
    expect(response.status).toBe(200);

    const cepDb = await Cep.findOne({ cep: "11223344" });
    expect(cepDb).toBeNull();
  });

  it("Deve listar todos os CEPs", async () => {
    await new Cep({
      cep: "55555555",
      logradouro: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      localidade: "Cidade Exemplo",
      uf: "SP", // ✅ Adicionado para evitar erro
    }).save();

    const response = await request(app).get("/api/cep");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
