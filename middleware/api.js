const secret_key = "Tut0r1al";
const jwt = require("jsonwebtoken");

module.exports = function isLoggedin(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  let user = { email: "prueba@prueba.com", password: "ThisIsNotATest" };
  if (typeof bearerHeader !== "undefined") {
    const tokenArray = bearerHeader.split(" ");
    req.token = tokenArray[1];

    jwt.verify(req.token, secret_key, (err, user) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Usuario no autorizado"
        });
      }else{
          req.user = user;
      }
    });
    next();
  } else {
    res
      .status(403)
      .render("unautorized", {
        success: false,
        message: "Usuario no autorizado"
      });
  }
};
