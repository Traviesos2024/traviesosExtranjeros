const mongoose = require("mongoose");

// el nombre del esquema en mayusculas
const ExperienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menssage" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //No sé si va a funcionar
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
