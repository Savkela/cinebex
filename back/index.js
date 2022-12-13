import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cinemaRoute from "./routes/cinemas.js";
import eventRoute from "./routes/events.js";
import equipmentRoute from "./routes/equipments.js";
import genreRoute from "./routes/genres.js";
import hallRoute from "./routes/halls.js";
import priceRoute from "./routes/prices.js";
import projectionRoute from "./routes/projections.js";
import seatRoute from "./routes/seats.js";
import technologyRoute from "./routes/technologies.js";
import rateRoute from "./routes/rates.js";
import movieRoute from "./routes/movies.js";
import photoRoute from "./routes/photos.js";
import actorRoute from "./routes/actors.js";

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
app.use("/api/equipments", equipmentRoute);
app.use("/api/actors", actorRoute);
app.use("/api/genres", genreRoute);
app.use("/api/halls", hallRoute);
app.use("/api/movies", movieRoute);
app.use("/api/photos", photoRoute);
app.use("/api/prices", priceRoute);
app.use("/api/projections", projectionRoute);
app.use("/api/rates", rateRoute);
app.use("/api/seats", seatRoute);
app.use("/api/technologies", technologyRoute);

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
