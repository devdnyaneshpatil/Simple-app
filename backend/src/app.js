const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const CustomError = require("./utils/customError");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", require("./routes"));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Server Is Healthy",
      pid: process.pid,
      uptime: process.uptime(),
    });
});

app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error); // Forward to the global error handler
});

app.use(errorHandler);

module.exports = app;