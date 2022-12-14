import Seat from "../models/Seat.js";
import Hall from "../models/Hall.js";

export const createSeat = async (req, res, next) => {
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
    next(err);
  }
};

export const updateSeat = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteSeat = async (req, res, next) => {
  try {
    await Seat.findByIdAndDelete(req.params.id);
    res.status(200).json("Seat has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getSeat = async (req, res, next) => {
  try {
    const Seat = await Seat.findById(req.params.id).populate("hall");
    res.status(200).json(Seat);
  } catch (err) {
    next(err);
  }
};

export const getSeats = async (req, res, next) => {
  try {
    const Seats = await Seat.find().populate("hall");
    res.status(200).json(Seats);
  } catch (err) {
    next(err);
  }
};
