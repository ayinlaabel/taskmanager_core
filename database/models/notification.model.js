const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
//   _userId: {
//     type: mongoose.Types.ObjectId,
//     required: true,
//   },
    chrome: {
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
    firefox: {
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
    IE: {
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

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
