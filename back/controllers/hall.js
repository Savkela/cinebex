import Cinema from "../models/Cinema.js";
import Projection from "../models/Projection.js";
import Hall from "../models/Hall.js";

export const createHall = async (req, res, next) => {
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
    next(err);
  }
};

export const updateHall = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteHall = async (req, res, next) => {
  try {
    const Hall = await Hall.findById(req.params.id);
    res.status(200).json(Hall);
  } catch (err) {
    next(err);
  }
};

export const getHall = async (req, res, next) => {
  try {
    const Hall = await Hall.findById(req.params.id)
      .populate("seats")
      .populate("cinema")
      .populate("projections");
    res.status(200).json(Hall);
  } catch (err) {
    next(err);
  }
};

export const getHalls = async (req, res, next) => {
  try {
    const Halls = await Hall.find()
      .populate("seats")
      .populate("cinema")
      .populate("projections");
    res.status(200).json(Halls);
  } catch (err) {
    next(err);
  }
};
