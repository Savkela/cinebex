import express from "express";
import Cinema from "../models/Cinema.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newCinema = new Cinema(req.body);
  try {
    const saveCinema = await newCinema.save();
    res.status(200).json(saveCinema);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
