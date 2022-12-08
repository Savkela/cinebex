import express from "express";
import { nextTick } from "process";
import Cinema from "../models/Cinema.js";
import Event from "../models/Event.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const saveEvent = await newEvent.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        events: {
          _id: saveEvent.id,
        },
      },
    });
    res.status(200).json(saveEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json("Event has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const event = await event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find().populate("cinema");
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
});

export default router;
