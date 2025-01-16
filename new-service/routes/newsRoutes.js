
const express = require("express");
const router = express.Router();
const { newNews, getAllNews, getNewsById, updateNews, deleteNews } = require("../controllers/newsController");

router.post("/create", newNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);


module.exports = router;
