const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  notification: {
    endpoint: {
      type: String,
    },
    expirationTime: {
      type: String,
    },
    keys: {
      auth: {
        type: String,
      },
      p256dh: {
        type: String,
      },
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
