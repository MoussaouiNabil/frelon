const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");

const validateLastName = (lastName) => {
  const regex = /^[a-zA-ZÀ-ÿ]+(?:[ -][a-zA-ZÀ-ÿ-]+)*$/;
  return regex.test(lastName);
};

const validatePhoneNumber = (phoneNumber) => {
  const regexTelephone = /^(0|\+33) ?[1-9]( ?\d{2}){4}$/;
  return regexTelephone.test(phoneNumber);
};

function validateCodePostal(chaine) {
  const regexCodePostal = /^\d{5}$/;
  return regexCodePostal.test(chaine);
}

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Adresse email invalide ou déja utilisée",
    },
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
    validate: {
      validator: validateLastName,
      message:
        "Format de nom incorrect: le nom ne doit pas contenir de chiffres ou de caractères spéciaux",
    },
  },
  lname: {
    type: String,
    required: true,
    validate: {
      validator: validateLastName,
      message:
        "Format de nom incorrect: le nom ou le prénom ne doivent pas contenir de chiffres ou de caractères spéciaux.",
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: validatePhoneNumber,
      message:
        "Saisie incorrecte. Merci de saisir un numéro au format +33XXXXXXXXX ou 0XXXXXXXXX.",
    },
  },
  codePostal: {
    type: String,
    required: true,
    validate: {
      validator: validateCodePostal,
      message:
        "Saisie incorrecte. Merci de saisir un code postal contenant uniquement 5 chiffres.",
    },
  },
  adresse: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
