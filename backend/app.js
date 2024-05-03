const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user");
const trapRoutes = require("./routes/trap");
const testRoutes = require("./routes/test"); // Importez la route de test

const whitelist = [
  /*
  "http://frelon.spin-io.fr",
  "https://frelon.spin-io.fr",
  */
  "http://127.0.0.1:27017",
  "http://localhost:3000",
  "http://localhost:5000",
  "https://192.168.20.27:3000",
  "https://192.168.20.27:5000",
];

const app = express();

// Connexion à MongoDB

mongoose
  .connect(
    //"mongodb+srv://elias_low_privileges:mongopwd@cluster0.pqpujxi.mongodb.net/?retryWrites=true&w=majority",
    //"mongodb+srv://moussaouinabil203:oblfIQ5k2kC4wVhP@cluster0.brgebdw.mongodb.net/",
    "mongodb://127.0.0.1:27017/frelon",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


  // Middleware CORS

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

// Middleware JSON et Morgan

const disableJsonMiddleware = (req, res, next) => {
  if (req.path.startsWith("/api/trap/images")) {
    next();
  } else {
    express.json()(req, res, next);
  }
};

app.use(morgan("dev")).use(disableJsonMiddleware);

// Routes principales

app.use("/api/auth", userRoutes);
app.use("/api/trap", trapRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
/*
// Route de test
app.use("/test", testRoutes); // Montez la route de test à '/test'
*/
module.exports = app;
