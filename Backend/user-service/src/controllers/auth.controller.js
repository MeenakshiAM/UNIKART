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
    const result = await userService.registerSeller(req.body);
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

