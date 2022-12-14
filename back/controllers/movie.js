import Movie from "../models/Movie.js";

export const createMovie = async (req, res, next) => {
  const newMovie = new Movie(req.body);
  try {
    const saveMovie = await newMovie.save();
    res.status(200).json(saveMovie);
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const Movie = await Movie.findById(req.params.id)
      .populate("genres")
      .populate("actors")
      .populate("rates")
      .populate("projections")
      .populate("cinemas")
      .populate("photos");
    res.status(200).json(Movie);
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const Movies = await Movie.find()
      .populate("genres")
      .populate("actors")
      .populate("rates")
      .populate("projections")
      .populate("cinemas")
      .populate("photos");
    res.status(200).json(Movies);
  } catch (err) {
    next(err);
  }
};
