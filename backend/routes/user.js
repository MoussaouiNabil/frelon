const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
 
// Route pour l'inscription
router.post("/sign-up", userCtrl.signup);

//console.log(userCtrl);

// Route pour la connexion
router.post("/sign-in", userCtrl.login);

// Route pour la déconnexion
router.post("/:id", userCtrl.getUsrName);

module.exports = router;
