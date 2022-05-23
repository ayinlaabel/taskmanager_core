const express = require("express");
const webpush = require("web-push");

const dotenv = require("dotenv");
dotenv.config();

const { User, Notification } = require("../database/models/index");

// webpush.setVapidDetails(
//   "mailto:test@test.com",
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

const router = express.Router();

router.patch("/", (req, res, next) => {
    User.findOneAndUpdate(
      {
        _userId: req._userId,
      },
      {
        $set: req.body,
      }
    ).then((user) => {
      res.status(200);
    });

    console.log(user);
});

module.exports = router;
