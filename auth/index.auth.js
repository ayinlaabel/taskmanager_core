const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        //  res.send({message: 'Login action require.'})
        res.status(403).send("You are require to login.");
      }else{
        req.userId = decoded.userId;
        // res.send({ decoded });
      }
      next();
    });
  } else {
    res.status(403).send({ message: "You need to login." });
  }
};
