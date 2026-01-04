const express = require("express");
const router = express.Router();
const { registerUser, registerSeller,getAllUsers } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/register-seller", registerSeller);
// existing routes...
router.get("/users", getAllUsers);


module.exports = router;
