import Technology from "../models/Technology.js";

export const createTechnology = async (req, res, next) => {
  const newTechnology = new Technology(req.body);
  try {
    const saveTechnology = await newTechnology.save();
    res.status(200).json(saveTechnology);
  } catch (err) {
    next(err);
  }
};

export const updateTechnology = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteTechnology = async (req, res, next) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.status(200).json("Technology has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getTechnology = async (req, res, next) => {
  try {
    const Technology = await Technology.findById(req.params.id)
      .populate("projections")
      .populate("halls");
    res.status(200).json(Technology);
  } catch (err) {
    next(err);
  }
};

export const getTechnologies = async (req, res, next) => {
  try {
    const Technologys = await Technology.find()
      .populate("projections")
      .populate("halls");
    res.status(200).json(Technologys);
  } catch (err) {
    next(err);
  }
};
