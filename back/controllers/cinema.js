import Cinema from "../models/Cinema.js";

export const createCinema = async (req, res, next) => {
  const newCinema = new Cinema(req.body);
  try {
    const saveCinema = await newCinema.save();
    res.status(200).json(saveCinema);
  } catch (err) {
    next(err);
  }
};

export const updateCinema = async (req, res, next) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCinema);
  } catch (err) {
    next(err);
  }
};

export const deleteCinema = async (req, res, next) => {
  try {
    await Cinema.findByIdAndDelete(req.params.id);
    res.status(200).json("Cinema has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getCinema = async (req, res, next) => {
  try {
    const cinema = await Cinema.findById(req.params.id)
      .populate("events")
      .populate("equipments")
      .populate("prices")
      .populate("photos");
    res.status(200).json(cinema);
  } catch (err) {
    next(err);
  }
};

export const getCinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find()
      .populate("events")
      .populate("equipments")
      .populate("prices")
      .populate("photos");
    res.status(200).json(cinemas);
  } catch (err) {
    next(err);
  }
};
