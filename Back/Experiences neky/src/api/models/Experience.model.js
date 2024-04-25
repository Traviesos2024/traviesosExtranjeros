const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menssage" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //No sé si va a funcionar
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experiencie", ExperienceSchema);

module.exports = Experience;
