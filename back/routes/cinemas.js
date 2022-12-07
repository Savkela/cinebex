import express from "express";
import { nextTick } from "process";
import Cinema from "../models/Cinema.js";
import { createError } from "../utils/error.js";

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

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCinema);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Cinema.findByIdAndDelete(req.params.id);
    res.status(200).json("Cinema has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    res.status(200).json(cinema);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate("events");
    res.status(200).json(cinemas);
  } catch (err) {
    next(err);
  }
});

export default router;
