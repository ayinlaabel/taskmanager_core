const express = require("express");
const webpush = require("web-push");

const dotenv = require("dotenv");
dotenv.config();

const { User, Notification } = require("../database/models/index");

webpush.setVapidDetails(
  "mailto:test@test.com",
  "BI68hqfedr9KhYdnEGYbRKKUYj9ZcUMuxe2j_HmvQzgyXLE5GCPjB3CX8HSHGyWKPjfV0uVtYJbuHbmmqsYyhdI",
  "aGWh2AMEP6spWq-_ThY5sWFaoDZ1xfza13enbrQtI2M"
);

const router = express.Router();

router.post("/", (req, res, next) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Testing Notification." });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

module.exports = router;
