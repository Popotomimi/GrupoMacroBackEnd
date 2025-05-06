require("dotenv").config();
const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;

async function main() {
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.q0b30uq.mongodb.net/Macro?retryWrites=true&w=majority&appName=Cluster0`
  );
  console.log("Conectamos ao MongoDB Atlas!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
