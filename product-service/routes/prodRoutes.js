const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { newPub, getAllPub, getPubById, updatePub, deletePub} = require("../controllers/prodController");

router.post("/create", authMiddleware, newPub);
router.get("/", getAllPub);
router.get("/:id", getPubById);
router.put("/:id", authMiddleware,updatePub);
router.delete("/:id", authMiddleware,deletePub);

module.exports = router;
