import express from "express";
import { nextTick } from "process";
import Technology from "../models/Technology.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newTechnology = new Technology(req.body);
  try {
    const saveTechnology = await newTechnology.save();
    res.status(200).json(saveTechnology);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedTechnology = await Technology.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTechnology);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.status(200).json("Technology has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Technology = await Technology.findById(req.params.id);
    res.status(200).json(Technology);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Technologys = await Technology.find()
      .populate("projections")
      .populate("halls");
    res.status(200).json(Technologys);
  } catch (err) {
    next(err);
  }
});

export default router;
