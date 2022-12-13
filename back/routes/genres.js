import express from "express";
import { nextTick } from "process";
import Genre from "../models/Genre.js";
import { createError } from "../utils/error.js";
import Movie from "../models/Movie.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newGenre = new Genre(req.body);
  try {
    const saveGenre = await newGenre.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        genres: {
          _id: saveGenre.id,
        },
      },
    });
    res.status(200).json(saveGenre);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedGenre);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json("Genre has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Genre = await Genre.findById(req.params.id);
    res.status(200).json(Genre);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Genres = await Genre.find().populate("movie");
    res.status(200).json(Genres);
  } catch (err) {
    next(err);
  }
});

export default router;
