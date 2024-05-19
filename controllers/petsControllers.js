const { HttpError, ctrlWrapper } = require("../helpers");
const { Pet } = require("../models/pets");

// const listPets = async (req, res, next) => {
//   const result = await Pet.find();
//   res.status(200).json(result);
// };

const listPets = async (req, res, next) => {
  let { page = 1, limit = 10, sort = "desc" } = req.query;
  page = Number(page);
  limit = Number(limit);

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  if (sort !== "asc" && sort !== "desc") {
    sort = "desc";
  }

  const total = await Pet.countDocuments();
  const skip = (page - 1) * limit;
  const sortOption = sort === "desc" ? -1 : 1;
  const result = await Pet.find()
    .sort({ age: sortOption })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: result,
  });
};

const getPetById = async (req, res, next) => {
  const { petId } = req.params;
  const result = await Pet.findById(petId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  listPets: ctrlWrapper(listPets),
  getPetById: ctrlWrapper(getPetById),
};
