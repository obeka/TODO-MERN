const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
        console.log(req.headers);
      const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
      if (!token) {
        throw new Error("Authentication failedssss!");
      }
      const decodedToken = jwt.verify(token, "todosaresecret");
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (err) {
      res.status(403).send(err.message);
    }
  };

  module.exports = auth;