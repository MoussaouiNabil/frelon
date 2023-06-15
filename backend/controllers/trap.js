const Trap = require("../models/Trap");
const fs = require("fs");

exports.create = (req, res, next) => {
  let coords =
    (req.body.latitude === 0 || req.body.latitude) &&
    (req.body.longitude === 0 || req.body.longitude);
  const trap = new Trap({
    deployed: req.body.deployed,
    longitude: req.body.deployed && coords ? req.body.longitude : null,
    latitude: req.body.deployed && coords ? req.body.latitude : null,
    userID: req.auth.userId,
    id: req.body.id,
    trapType: req.body.trapType,
    nbCapture: req.body.nbCapture ? req.body.nbCapture : 0,
    imgUrl: "",
  });

  trap
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({
        error,
        message:
          error.name === "ValidationError"
            ? error.errors.id
              ? "Identifiant de piège déja attribué"
              : "Saisie incorrecte sur un ou plusieurs champs"
            : "Erreur",
      });
    });
};

exports.mytraps = (req, res, next) => {
  Trap.find({
    userID: req.auth.userId,
  })
    .then((traps) => {
      res.status(200).json(traps);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getspecifiedtrap = (req, res, next) => {
  Trap.findOne({
    id: req.params.id,
  })
    .then((trap) => {
      res.status(200).json(trap);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.alltraps = (req, res, next) => {
  Trap.find()
    .then((traps) => {
      res.status(200).json(traps);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.addCapture = (req, res, next) => {
  Trap.findOne({ id: req.params.id })
    .then((trap) => {
      if (trap.userID != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Trap.updateOne(
          { id: req.params.id },
          {
            nbCapture: trap.nbCapture + 1,
          }
        )
          .then(() => res.status(200).json({ message: "Capture ajoutée!" }))
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.update = (req, res, next) => {
  let newTrap = req.body;
  Trap.findOne({ id: req.params.id })
    .then((trap) => {
      if (trap.userID != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Trap.updateOne(
          { id: req.params.id },
          {
            ...newTrap,
          }
        )
          .then(() => res.status(200).json({ message: "Piège modifié!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.delete = (req, res, next) => {
  Trap.findOne({ id: req.params.id })
    .then((trap) => {
      if (trap) {
        if (trap.userID != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          if (trap.imgUrl) {
            fs.unlink("./" + trap.imgUrl, (err) => {
              if (err) console.log(err);
            });
          }
          Trap.deleteOne({ id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Piège supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        }
      } else {
        res.status(400).json({ error, message: "Le piège n'existe pas" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la recherche du piège." });
    });
};

exports.addImg = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ error: "Vous n'avez pas fourni d'image." });
  } else {
    Trap.updateOne(
      { id: req.params.id },
      {
        imgUrl: req.file.path,
      }
    )
      .then(() => res.status(200).json({ message: "Piège modifié!" }))
      .catch((error) => res.status(401).json({ error }));
  }
};

exports.deleteImg = (req, res, next) => {
  const trapId = req.params.id;
  Trap.findOne({ id: trapId })
    .then((trap) => {
      if (trap) {
        if (trap.userID != req.auth.userId) {
          res.status(401).json({ message: "Non autorisé" });
        } else if (!trap.imgUrl) {
          res.status(400).json({ message: "Le piège ne possède pas d'image" });
        } else {
          //Supprimer l'image contenue dans trap.imgUrl puis mettre trap.imgUrl à ""
          fs.unlink("./" + trap.imgUrl, (err) => {
            Trap.updateOne({ id: trapId }, { imgUrl: "" })
              .then(() => res.status(200).json({ message: "Image supprimée!" }))
              .catch((error) => res.status(500).json({ error }));
          });
        }
      } else {
        res.status(400).json({ error: "Ce piège n'existe pas." });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error, message: "Erreur lors de la recherche du piège." });
    });
};
