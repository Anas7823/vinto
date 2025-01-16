const express = require("express");
const router = express.Router();
const { newPub, getAllPub, getPubById, updatePub, deletePub} = require("../controllers/prodController");

router.post("/create", newPub);
router.get("/", getAllPub);
router.get("/:id", getPubById);
router.put("/:id", updatePub);
router.delete("/:id", deletePub);

module.exports = router;
