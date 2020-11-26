const { verify } = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("no auth token found! auth denied");
  }

  //   token verify
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user.id;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("not a valid token! retry");
  }
};
