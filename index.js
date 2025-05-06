require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

const cepRoutes = require("./routes/cepRoutes");
app.use("/api", cepRoutes);

module.exports = app;

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
