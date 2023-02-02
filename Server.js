require("dotenv").config();
require("express-async-errors");
const express = require("express");

// Importing middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// Importing db connection
const connectDB = require("./Database/db");
// Importing Routes
const studentRoutes = require("./Routes/StudentRoutes");
const app = express();
// Middlewares setup
app.use(express.json());
// Routes
app.use("/v1/api/students", studentRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
