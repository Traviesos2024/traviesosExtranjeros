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

