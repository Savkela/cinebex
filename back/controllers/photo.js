import Photo from "../models/Photo.js";
import Movie from "../models/Movie.js";
import Cinema from "../models/Cinema.js";

export const createPhoto = async (req, res, next) => {
  const newPhoto = new Photo(req.body);
  try {
    const savePhoto = await newPhoto.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        photos: {
          _id: savePhoto.id,
        },
      },
    });
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        photos: {
          _id: savePhoto.id,
        },
      },
    });

    res.status(200).json(savePhoto);
  } catch (err) {
    next(err);
  }
};

export const updatePhoto = async (req, res, next) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPhoto);
  } catch (err) {
    next(err);
  }
};

export const deletePhoto = async (req, res, next) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.status(200).json("Photo has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getPhoto = async (req, res, next) => {
  try {
    const Photo = await Photo.findById(req.params.id)
      .populate("cinema")
      .populate("movie");
    res.status(200).json(Photo);
  } catch (err) {
    next(err);
  }
};

export const getPhotos = async (req, res, next) => {
  try {
    const Photos = await Photo.find().populate("cinema").populate("movie");
    res.status(200).json(Photos);
  } catch (err) {
    next(err);
  }
};
