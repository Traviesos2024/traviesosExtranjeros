const mongoose = require("mongoose");

// el nombre del esquema en mayusculas
const CountrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    cities: [ {type: mongoose.Schema.Types.ObjectId, ref: "City" }],
    tipicalFood: { type: String },
    traditions: { type: String },
    image: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
