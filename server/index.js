const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/v1/", userRoute);
app.use("/api/v2/", chatRoute);
app.use("/api/v3/", messageRoute);

app.get("/", (req, res) => {
  res.json({ message: "Registration successful" });
});

const uri = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Sever running on port ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log("mongoDB here!"))
  .catch((error) => console.log("Hell no: ", error.message));
