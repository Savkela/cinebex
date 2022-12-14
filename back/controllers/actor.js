export const createActor = async (req, res, next) => {
  const newActor = new Actor(req.body);
  try {
    const saveActor = await newActor.save();
    await Movie.findByIdAndUpdate(req.body.movieId, {
      $push: {
        actors: {
          _id: saveActor.id,
        },
      },
    });
    res.status(200).json(saveActor);
  } catch (err) {
    next(err);
  }
};

export const updateActor = async (req, res, next) => {
  try {
    const updatedActor = await Actor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedActor);
  } catch (err) {
    next(err);
  }
};

export const deleteActor = async (req, res, next) => {
  try {
    await Actor.findByIdAndDelete(req.params.id);
    res.status(200).json("Actor has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getActor = async (req, res, next) => {
  try {
    const Actor = await Actor.findById(req.params.id).populate("movies");
    res.status(200).json(Actor);
  } catch (err) {
    next(err);
  }
};

export const getActors = async (req, res, next) => {
  try {
    const Actors = await Actor.find().populate("movies");
    res.status(200).json(Actors);
  } catch (err) {
    next(err);
  }
};
