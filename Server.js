// Importing packages
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importing middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/auth");
// Importing db connection
const connectDB = require("./Database/db");
// Importing Routes
const studentRoutes = require("./Routes/StudentRoutes/StudentRoutes");
const loginRoutes = require("./Routes/StudentRoutes/LoginRoutes");
const courseRoutes = require("./Routes/CourseRoutes/CourseRoutes");
const app = express();

// Middlewares setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/v1/students", authenticationMiddleware, studentRoutes);
app.use("/api/v1/studentslogin", loginRoutes);

//Course Routes
app.use("/api/v1/", courseRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server start function
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
