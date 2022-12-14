import Movie from "../models/Movie.js";
import Rate from "../models/Rate.js";

export const createRate = async (req, res, next) => {
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
    next(err);
  }
};

export const updateRate = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteRate = async (req, res, next) => {
  try {
    await Rate.findByIdAndDelete(req.params.id);
    res.status(200).json("Rate has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getRate = async (req, res, next) => {
  try {
    const Rate = await Rate.findById(req.params.id).populate("movie");
    res.status(200).json(Rate);
  } catch (err) {
    next(err);
  }
};

export const getRates = async (req, res, next) => {
  try {
    const Rates = await Rate.find().populate("movie");
    res.status(200).json(Rates);
  } catch (err) {
    next(err);
  }
};
