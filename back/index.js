import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cinemaRoute from "./routes/cinemas.js";
import eventRoute from "./routes/events.js";

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

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cinemas", cinemaRoute);
app.use("/api/events", eventRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

//listen
app.listen(8800, () => {
  connect();
  console.log("Connected to backend! port 8800");
});
