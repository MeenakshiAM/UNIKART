const express = require("express");
const router = express.Router();

const {
  registerUser,
  registerSeller,
  getAllUsers,
  login,
  testAuth
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", login);

router.get("/users", getAllUsers);
router.get("/test", authMiddleware, testAuth);
router.post("/register-seller", authMiddleware, registerSeller);



module.exports = router;
