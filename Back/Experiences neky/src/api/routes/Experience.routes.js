const express = require("express");
const {
  toggleLikeExperience,
  toggleUser,
  createExperience,
} = require("../controllers/Experiences.controllers");
const { isAuth } = require("../../middleware/auth.middleware");
const ExperienceRoutes = express.Router();

ExperienceRoutes.patch("/like/:idExperience", [isAuth], toggleLikeExperience);
ExperienceRoutes.patch("/addUser/:idExperience", [isAuth], toggleUser);
ExperienceRoutes.post("/create", [isAuth], createExperience);

module.exports = ExperienceRoutes;

// Añadir esto en el index.js

// const ExperienceRoutes = require("./src/api/routes/Experience.routes");
// app.use("/api/v1/experience/", ExperienceRoutes);
//Añadir en las variables de entorno de insomnia la experience
