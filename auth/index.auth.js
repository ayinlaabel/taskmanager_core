const jwt = require("jsonwebtoken");

exports.verifyToken = function verifyToken(req, res, next) {
  let bearerToken = req.headers["authorization"];

  if (bearerToken !== undefined) {
    let bearer = bearerToken.split(" ");

    let token = bearer[1];

    jwt.verify(token, "envfile", (err, decoded) => {
      if (err){
        //  res.send({message: 'Login action require.'}) 
        res.sendStatus(403);
      }
      req.userId = decoded.userId;
    //   res.send({ decoded });
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
