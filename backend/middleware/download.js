const multer = require("multer");
const path = require("path");
const Trap = require("../models/Trap");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = MIME_TYPES[file.mimetype];

    const nameWithoutExtension = originalName.split(".").slice(0, -1).join(".");

    callback(null, nameWithoutExtension + "-" + Date.now() + "." + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024, // Limite de 4 Mo (4 * 1024 * 1024 octets)
  },
});

module.exports = (req, res, next) => {
  const trapId = req.params.id;
  Trap.findOne({ id: trapId })
    .then((trap) => {
      if (trap) {
        if (trap.userID != req.auth.userId) {
          res.status(401).json({ message: "Non autorisé" });
        } else if (trap.imgUrl) {
          res.status(400).json({ message: "Le piège possède déja une image" });
        } else {
          upload.single("image")(req, res, next);
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
