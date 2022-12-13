import express from "express";
import { nextTick } from "process";
import Movie from "../models/Movie.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const saveMovie = await newMovie.save();
    res.status(200).json(saveMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Movie = await Movie.findById(req.params.id);
    res.status(200).json(Movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Movies = await Movie.find()
      .populate("genres")
      .populate("actors")
      .populate("rates")
      .populate("projections")
      .populate("cinemas")
      .populate("photos");
    res.status(200).json(Movies);
  } catch (err) {
    next(err);
  }
});

export default router;
