const express = require("express");
const {
  getCep,
  updateCep,
  favoriteCep,
  deleteCep,
  getAllCep,
} = require("../controllers/cepController");
const router = express.Router();

router.get("/cep/:cep", getCep);
router.put("/cep/:cep", updateCep);
router.post("/cep/favorite/:cep", favoriteCep);
router.delete("/cep/favorite/:cep", deleteCep);
router.get("/cep", getAllCep);

module.exports = router;
