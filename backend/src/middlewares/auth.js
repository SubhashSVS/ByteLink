const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if(!header || !header.startsWith('Bearer ')){
    return res.status(403).json({ message: "Unauthorized access" });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(err) {
    res.status(403).json({err});
  }
}

module.exports = auth;