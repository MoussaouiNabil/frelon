// routes/test.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Ceci est un message de test !" });
});

module.exports = router;
