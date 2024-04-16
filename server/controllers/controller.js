const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const Home = (req, res) => {
  try {
    res.status(200).send("Welcome to Home");
  } catch (error) {
    console.log(`Home Controller Error: ${error}`);
  }
};

const Register = async (req, res) => {
  // console.log(req.body)
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "Email Already Registered!" });
    }

    const userCreated = await User.create({ username, email, password });

    // Example payload
    const payload = {
      userId: userCreated._id,
      email: userCreated.email,
    };

    // Example secret key (you should use a secure secret key in production)

    // Example options (optional)
    const options = {
      expiresIn: "24h", // Token expiration time
    };

    // Generate JWT
    const token = jwt.sign(payload, secretKey, options);

    console.log(token);
    // Return the token or use it as needed

    res.json({ msg: `User Registered!`, token: token });
  } catch (error) {
    console.log(`register error: ${error}`);
  }
};

const Login = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "User Not Registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    // Example payload
    const payload = {
      userId: userExist._id,
      email: userExist.email,
    };

    // Example options (optional)
    const options = {
      expiresIn: "24h", // Token expiration time
    };

    // Generate JWT
    const token = jwt.sign(payload, secretKey, options);

    res.json({ msg: `User Logged In`, token: token });
  } catch (error) {
    console.log(`login error: ${error}`);
  }
};

const Logout = async (req, res) => {
  res.status(200).json({ msg: "Logged Out" });
};

const UserController = async (req, res) => {
  try {
    const userData = req.userData;
    res.status(200).json({userData});
  } catch (error) {
    res.status(500).json({ msg: "User Error" });
  }
};

module.exports = {
  Home,
  Register,
  Login,
  Logout,
  UserController,
};
