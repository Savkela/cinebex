import express from "express";
import { nextTick } from "process";
import Actor from "../models/Actor.js";
import { createError } from "../utils/error.js";
import Movie from "../models/Movie.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newActor = new Actor(req.body);
  try {
    const saveActor = await newActor.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        actors: {
          _id: saveActor.id,
        },
      },
    });
    res.status(200).json(saveActor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedActor = await Actor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedActor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Actor.findByIdAndDelete(req.params.id);
    res.status(200).json("Actor has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Actor = await Actor.findById(req.params.id);
    res.status(200).json(Actor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Actors = await Actor.find().populate("movies");
    res.status(200).json(Actors);
  } catch (err) {
    next(err);
  }
});

export default router;
