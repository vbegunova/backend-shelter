const express = require("express");

const ctrl = require("../../controllers/petsControllers");
const { isValidPetId } = require("../../middlewares");

const router = express.Router();

router.get("/cats", ctrl.listPets);

router.get("/cats/:petId", isValidPetId, ctrl.getPetById);

module.exports = router;
