import express from "express";
import { nextTick } from "process";
import Projection from "../models/Projection.js";
import { createError } from "../utils/error.js";
import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Technology from "../models/Technology.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newProjection = new Projection(req.body);
  try {
    const saveProjection = await newProjection.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    await Hall.findByIdAndUpdate(req.body.hallId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    await Technology.findByIdAndUpdate(req.body.tehnologyId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    res.status(200).json(saveProjection);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedProjection = await Projection.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProjection);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Projection.findByIdAndDelete(req.params.id);
    res.status(200).json("Projection has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Projection = await Projection.findById(req.params.id);
    res.status(200).json(Projection);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Projections = await Projection.find()
      .populate("movie")
      .populate("hall")
      .populate("tehnology");
    res.status(200).json(Projections);
  } catch (err) {
    next(err);
  }
});

export default router;
