import express from "express";
import { nextTick } from "process";
import Hall from "../models/Hall.js";
import { createError } from "../utils/error.js";
import Cinema from "../models/Cinema.js";
import Projection from "../models/Projection.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newHall = new Hall(req.body);
  try {
    const saveHall = await newHall.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        halls: {
          _id: saveHall.id,
        },
      },
    });
    await Projection.findByIdAndUpdate(req.body.projectionId, {
      $push: {
        halls: {
          _id: saveHall.id,
        },
      },
    });
    res.status(200).json(saveHall);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHall);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Hall.findByIdAndDelete(req.params.id);
    res.status(200).json("Hall has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Hall = await Hall.findById(req.params.id);
    res.status(200).json(Hall);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Halls = await Hall.find()
      .populate("seats")
      .populate("cinema")
      .populate("projections");
    res.status(200).json(Halls);
  } catch (err) {
    next(err);
  }
});

export default router;
