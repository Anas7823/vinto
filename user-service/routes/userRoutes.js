
const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUserById, getMyUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.get("/me", getMyUser);

module.exports = router;
