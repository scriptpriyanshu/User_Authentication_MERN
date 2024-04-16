const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").trim();

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log("Token from the auth middleware", token);

  try {
    const isVerified = jwt.verify(token, process.env.SECRET_KEY);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    console.log(userData);

    req.userData = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    res.status(401).json({ error: "auth middleware: Unauthorized" });
    console.log(error);
  }
};

module.exports = authMiddleware;
