const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const trapSchema = mongoose.Schema({
  deployed: {
    type: Boolean,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  trapType: {
    type: Number,
    required: true,
    validate: {
      validator: function (n) {
        return n <= 3 && n >= 1;
      },
    },
  },
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  latitude: {
    type: Number,
    validate: {
      validator: function (v) {
        return this.deployed ? v != null && v <= 90 && v >= -90 : true;
      },
    },
    required: function () {
      return this.deployed;
    },
  },
  longitude: {
    type: Number,
    validate: {
      validator: function (v) {
        return this.deployed ? v != null && v <= 180 && v >= -180 : true;
      },
    },
    required: function () {
      return this.deployed;
    },
  },
  nbCapture: {
    type: Number,
    default: 0,
    required: true,
    validate: {
      validator: function (n) {
        return n >= 0;
      },
    },
  },
  imgUrl: {
    type: String,
  },
});

trapSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Trap", trapSchema);
