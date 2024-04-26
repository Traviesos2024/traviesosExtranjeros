const mongoose = require("mongoose");

// el nombre del esquema en mayusculas
const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: {type: String},
    numHab: {type: number},
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("City", CitySchema);

module.exports = City;