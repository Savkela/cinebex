import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cinemaRoute from "./routes/cinemas.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconected", () => {
  console.log("mongoDB disconected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

//middlewares

app.get("/cinemas", (req, res) => {
  res.send("hello cinemass");
});

app.use("/api/auth", authRoute);
app.use("/api/cinemas", cinemaRoute);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend! port 8800");
});
