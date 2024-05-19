const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
    },
    breed: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    timeInShelter: {
      type: Number,
    },
    health: {
      type: String,
    },
    healthRating: {
      type: Number,
    },
    color: {
      type: String,
    },
    careFeatures: {
      type: String,
    },
    species: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true, collection: 'cats' }
);

const Pet = model("pet", petSchema);

module.exports = { Pet };
