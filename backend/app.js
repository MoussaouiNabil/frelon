const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user");
const trapRoutes = require("./routes/trap");

const whitelist = [
  "http://localhost:3000",
  "http://frelon.spin-io.fr",
  "https://frelon.spin-io.fr",
  "http://192.168.20.50:3000",
];

const app = express();

mongoose
  .connect(
    "mongodb+srv://elias_low_privileges:mongopwd@cluster0.pqpujxi.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

const disableJsonMiddleware = (req, res, next) => {
  if (req.path.startsWith("/api/trap/images")) {
    next();
  } else {
    express.json()(req, res, next);
  }
};

app.use(morgan("dev")).use(disableJsonMiddleware);

app.use("/api/auth", userRoutes);
app.use("/api/trap", trapRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
