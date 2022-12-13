import express from "express";
import { nextTick } from "process";
import Movie from "../models/Movie.js";
import Rate from "../models/Rate.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newRate = new Rate(req.body);
  try {
    const saveRate = await newRate.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        rates: {
          _id: saveRate.id,
        },
      },
    });
    res.status(200).json(saveRate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedRate = await Rate.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Rate.findByIdAndDelete(req.params.id);
    res.status(200).json("Rate has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Rate = await Rate.findById(req.params.id);
    res.status(200).json(Rate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Rates = await Rate.find().populate("movie");
    res.status(200).json(Rates);
  } catch (err) {
    next(err);
  }
});

export default router;
