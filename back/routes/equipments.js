import express from "express";
import { nextTick } from "process";
import Equipment from "../models/Equipment.js";
import { createError } from "../utils/error.js";
import Cinema from "../models/Cinema.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newEquipment = new Equipment(req.body);
  try {
    const saveEquipment = await newEquipment.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        equipments: {
          _id: saveEquipment.id,
        },
      },
    });
    res.status(200).json(saveEquipment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEquipment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.status(200).json("Equipment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Equipment = await Equipment.findById(req.params.id);
    res.status(200).json(Equipment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Equipments = await Equipment.find().populate("cinema");
    res.status(200).json(Equipments);
  } catch (err) {
    next(err);
  }
});

export default router;
