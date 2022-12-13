import express from "express";
import { nextTick } from "process";
import Photo from "../models/Photo.js";
import { createError } from "../utils/error.js";
import Movie from "../models/Movie.js";
import Cinema from "../models/Cinema.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newPhoto = new Photo(req.body);
  try {
    const savePhoto = await newPhoto.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        photos: {
          _id: savePhoto.id,
        },
      },
    });
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        photos: {
          _id: savePhoto.id,
        },
      },
    });

    res.status(200).json(savePhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.status(200).json("Photo has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Photo = await Photo.findById(req.params.id);
    res.status(200).json(Photo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Photos = await Photo.find().populate("cinema").populate("movie");
    res.status(200).json(Photos);
  } catch (err) {
    next(err);
  }
});

export default router;
