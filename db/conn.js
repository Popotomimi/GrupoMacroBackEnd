require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  let mongoUri;

  if (typeof jest !== "undefined") {
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  } else {
    mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.q0b30uq.mongodb.net/Macro?retryWrites=true&w=majority&appName=Cluster0`;
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Banco de dados conectado!");
};

module.exports = connectDB;
