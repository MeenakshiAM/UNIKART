const express = require("express");
const router = express.Router();
const { registerUser, registerSeller } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/register-seller", registerSeller);

module.exports = router;
