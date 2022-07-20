const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

/**
 * @desc - Import mongoose model
 */
const { List, Task, User } = require("../database/models");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        let newUser = new User({
          email,
          password: hash,
        });

        newUser
          .save()
          .then((user) => {
            res.send({ statuse: "SUCCESS", user });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ status: "FAILED", message: "User already existing." });
  }
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            res.send({
              status: "FAILED",
              message: "Wrong password, try again.",
            });
          } else {
            jwt.sign({ userId: user._id }, process.env.SECRET, (err, token) => {
              if (err) throw err;

              res.send({ token, user });
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      res.send({ status: "FAILED", message: "User not found!" });
    }
  });
});

module.exports = router;
