const express = require("express");
const {
  toggleLikeExperience,
  toggleEvent,
  createExperience,
} = require("../controllers/Experiences.controllers");
const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const ExperienceRoutes = express.Router();

ExperienceRoutes.patch("/like/:idExperience", [isAuth], toggleLikeExperience);
ExperienceRoutes.patch("/addEvent/:idExperience", [isAuth], toggleEvent);
ExperienceRoutes.post(
  "/create",
  [isAuth],
  upload.single("image"),
  createExperience
);

module.exports = ExperienceRoutes;
