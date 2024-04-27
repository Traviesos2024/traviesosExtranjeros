const express = require("express");
const {
  toggleLikeExperience,
  toggleEvent,
  createExperience,
  byId,
  update,
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
ExperienceRoutes.patch(
  "/update/:idExperience",
  [isAuth],
  upload.single("image"),
  update
);
ExperienceRoutes.get("/finById/:idExperience", byId);

module.exports = ExperienceRoutes;
