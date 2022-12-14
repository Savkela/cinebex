import Genre from "../models/Genre.js";
import Movie from "../models/Movie.js";

export const createGenre = async (req, res, next) => {
  const newGenre = new Genre(req.body);
  try {
    const saveGenre = await newGenre.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        genres: {
          _id: saveGenre.id,
        },
      },
    });
    res.status(200).json(saveGenre);
  } catch (err) {
    next(err);
  }
};

export const updateGenre = async (req, res, next) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedGenre);
  } catch (err) {
    next(err);
  }
};

export const deleteGenre = async (req, res, next) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json("Genre has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getGenre = async (req, res, next) => {
  try {
    const Genre = await Genre.findById(req.params.id).populate("movie");
    res.status(200).json(Genre);
  } catch (err) {
    next(err);
  }
};

export const getGenres = async (req, res, next) => {
  try {
    const Genres = await Genre.find().populate("movie");
    res.status(200).json(Genres);
  } catch (err) {
    next(err);
  }
};
