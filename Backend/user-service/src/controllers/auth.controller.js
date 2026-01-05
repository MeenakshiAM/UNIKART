const userService = require("../services/user.service");

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerSeller = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await userService.registerSeller({
      userId,
      ...req.body
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//----------login-----------

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser({ email, password });

    res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

//----------testing authentication middleware
exports.testAuth = (req, res) => {
  res.json({
    message: "Auth middleware working ✅",
    user: req.user
  });
};


