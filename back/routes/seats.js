import express from "express";
import Seat from "../models/Seat.js";
import Hall from "../models/Hall.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newSeat = new Seat(req.body);
  try {
    const saveSeat = await newSeat.save();
    await Hall.findByIdAndUpdate(req.body.hallId, {
      $push: {
        seats: {
          _id: saveSeat.id,
        },
      },
    });
    res.status(200).json(saveSeat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSeat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Seat.findByIdAndDelete(req.params.id);
    res.status(200).json("Seat has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Seat = await Seat.findById(req.params.id);
    res.status(200).json(Seat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Seats = await Seat.find().populate("hall");
    res.status(200).json(Seats);
  } catch (err) {
    next(err);
  }
});

export default router;
