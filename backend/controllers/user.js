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
  if (!verifyPwd(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 6 caractères et combiner des lettres et des chiffres.",
    });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          lname: req.body.lname,
          fname: req.body.fname,
          phoneNumber: req.body.number,
          codePostal: req.body.postal,
          adresse: req.body.adress,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) =>
            res.status(400).json({
              error,
              message:
                error.name === "ValidationError"
                  ? error.errors.email
                    ? "Format email incorrect ou email déja utilisé"
                    : "Saisie incorrecte"
                  : "Erreur",
            })
          );
      })
      .catch((error) =>
        res.status(500).json({
          error,
          message:
            "Le serveur n'a pas pu vous renvoyer de réponse, veuillez réessayer ultérieurement",
        })
      );
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, key, { expiresIn: "24h" }),
          });
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
      res.status(200).json({
        name: user.fname + " " + user.lname,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.key = key;
