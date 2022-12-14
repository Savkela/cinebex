import Price from "../models/Price.js";
import Cinema from "../models/Cinema.js";

export const createPrice = async (req, res, next) => {
  const newPrice = new Price(req.body);
  try {
    const savePrice = await newPrice.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        prices: {
          _id: savePrice.id,
        },
      },
    });
    res.status(200).json(savePrice);
  } catch (err) {
    next(err);
  }
};

export const updatePrice = async (req, res, next) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPrice);
  } catch (err) {
    next(err);
  }
};

export const deletePrice = async (req, res, next) => {
  try {
    await Price.findByIdAndDelete(req.params.id);
    res.status(200).json("Price has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getPrice = async (req, res, next) => {
  try {
    const Price = await Price.findById(req.params.id).populate("cinema");
    res.status(200).json(Price);
  } catch (err) {
    next(err);
  }
};

export const getPrices = async (req, res, next) => {
  try {
    const Prices = await Price.find().populate("cinema");
    res.status(200).json(Prices);
  } catch (err) {
    next(err);
  }
};
