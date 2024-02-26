const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { errorHandler } = require("./backend/middlewares/errorMiddleware");

//----------------------------------------------------------------DATABASE
const connectDB = require("./backend/configs/db");
connectDB();

//----------------------------------------------------------------MIDDLEWARE - REQUEST Data Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.get("/api", (req, res) => {
  res.send("API Status: Active ✔");
});

//----------------------------------------------------------------ROUTES
app.use("/api/user", require("./backend/routes/userRoutes"));
app.use("/api/upload", require("./backend/routes/uploadRoutes"));
app.use("/api/post", require("./backend/routes/postRoutes"));

//----------------------------------------------------------------MIDDLEWARE - Custom Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
