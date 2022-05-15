const express = require("express");
const bodyParse = require("body-parser");
const { mongoose } = require("./database/mongoose");

const listRouter = require("./routers/lists.router");
const userRouter = require("./routers/user.router");


const dotenv = require("dotenv");
dotenv.config();

const app = express();

/**
 * @desc - This are Middleware
 */

app.use(bodyParse.json());

/**
 * @desc - This middleware handle the cors origin error
 */

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

/**
 * Route Handler
 * List Route
 */

app.use("/lists", listRouter);
app.use("/users", userRouter);

/**
 * Coonection Port
 */
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is connected on port ${port}...`);
});
