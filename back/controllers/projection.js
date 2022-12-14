import Projection from "../models/Projection.js";
import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Technology from "../models/Technology.js";

export const createProjection = async (req, res, next) => {
  const newProjection = new Projection(req.body);
  try {
    const saveProjection = await newProjection.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    await Hall.findByIdAndUpdate(req.body.hallId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    await Technology.findByIdAndUpdate(req.body.tehnologyId, {
      $push: {
        projections: {
          _id: saveProjection.id,
        },
      },
    });
    res.status(200).json(saveProjection);
  } catch (err) {
    next(err);
  }
};

export const updateProjection = async (req, res, next) => {
  try {
    const updatedProjection = await Projection.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProjection);
  } catch (err) {
    next(err);
  }
};

export const deleteProjection = async (req, res, next) => {
  try {
    await Projection.findByIdAndDelete(req.params.id);
    res.status(200).json("Projection has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getProjection = async (req, res, next) => {
  try {
    const Projection = await Projection.findById(req.params.id)
      .populate("movie")
      .populate("hall")
      .populate("tehnology");
    res.status(200).json(Projection);
  } catch (err) {
    next(err);
  }
};

export const getProjections = async (req, res, next) => {
  try {
    const Projections = await Projection.find()
      .populate("movie")
      .populate("hall")
      .populate("tehnology");
    res.status(200).json(Projections);
  } catch (err) {
    next(err);
  }
};
