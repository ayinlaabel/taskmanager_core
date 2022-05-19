const express = require("express");
const webpush = require("web-push");

const dotenv = require("dotenv");
dotenv.config();

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Starting");
  const subscription = req.body;

  res.status(201).json({});

  payload = JSON.stringify({ title: req.body.title });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

module.exports = router;
