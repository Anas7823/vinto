const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 3003;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vinto", {});

const newsRoutes = require("./routes/newsRoutes");

app.use("/news", newsRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port http://localhost:${PORT}`);
});
