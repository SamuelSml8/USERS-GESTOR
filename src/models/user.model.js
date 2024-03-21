const mongoose = require("mongoose");

const emplooyeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users_simulation", emplooyeSchema);

module.exports = User;