const express = require("express");
const router = require("./routes/route");
const connectDB = require("./utils/db");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  })
);

app.use("/", router);

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
