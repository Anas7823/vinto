const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 3002;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vinto", {});

const prodRoutes = require("./routes/prodRoutes");

app.use("/product", prodRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port http://localhost:${PORT}`);
});
