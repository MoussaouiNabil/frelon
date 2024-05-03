const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const CryptoJS = require("crypto-js");

const keySize = 64;
const key = CryptoJS.lib.WordArray.random(keySize).toString();

const verifyPwd = (v) =>
  validator.isLength(v, { min: 6 }) && /\d/.test(v) && /[a-zA-Z]/.test(v);

exports.signup = (req, res, next) => {
  const { email, password, lname, fname, phoneNumber, codePostal, adresse, confirmPassword } = req.body;

  if (!verifyPwd(password)) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 6 caractères et combiner des lettres et des chiffres.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Les mots de passe ne correspondent pas.",
    });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email: email,
        password: hash,
        lname: lname,
        fname: fname,
        phoneNumber: phoneNumber,
        codePostal: codePostal,
        adresse: adresse,
      });
      return user.save();
    })
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: error.errors.email || error,
        });
      } else {
        return res.status(500).json({
          message: "Le serveur n'a pas pu vous renvoyer de réponse, veuillez réessayer ultérieurement",
        });
      }
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
      }

      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
          }
          const token = jwt.sign({ userId: user._id }, key, { expiresIn: "24h" });
          res.status(200).json({ userId: user._id, token });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUsrName = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Identifiant inexistant" });
      }
      res.status(200).json({ name: user.fname + " " + user.lname });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.key = key;
