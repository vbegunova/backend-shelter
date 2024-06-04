const { HttpError, ctrlWrapper } = require("../helpers");
const { Pet } = require("../models/pets");

const convertAgeToMonths = (ageString) => {
  const yearMatch = ageString.match(/(\d+)\s*(?:рік|років|р)/);
  const monthMatch = ageString.match(/(\d+)\s*місяц(?:ь|ів)?/);
  console.log("monthMatch", monthMatch);

  const years = yearMatch ? parseInt(yearMatch[1], 10) : 0;
  const months = monthMatch ? parseInt(monthMatch[1], 10) : 0;

  return years * 12 + months;
};

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

  let result = await Pet.find();
  result = result.map((pet) => ({
    ...pet._doc,
    ageInMonths: convertAgeToMonths(pet.age),
  }));

  result.sort((a, b) =>
    sort === "desc"
      ? b.ageInMonths - a.ageInMonths
      : a.ageInMonths - b.ageInMonths
  );

  const paginatedResult = result.slice(skip, skip + limit);

  res.status(200).json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: paginatedResult,
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
