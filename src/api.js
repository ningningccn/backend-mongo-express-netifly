require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");

// mongodb
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

// routes
const routes = require("./routes/routes");
const todoRouter = require("./routes/todo");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use("/todo", todoRouter);

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);