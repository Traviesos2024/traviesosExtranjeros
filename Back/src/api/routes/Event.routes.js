const express = require("express");
const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  createEvent,
  getByCategory,
  getByCity,
  getAll,
  getByName,
  updateEvent,
  deleteEvent,
  toggleLikeEvent,
  toggleFollowEvent,
  sortByDateEvent,
} = require("../controllers/Events.controllers"); //* cuidado si el archivo es en singular//
const EventRoutes = express.Router();

EventRoutes.post("/createEvent", [isAuth], upload.single("image"), createEvent);
EventRoutes.get("/getAll", getAll);
EventRoutes.get("/get/name/:name", getByName);
EventRoutes.get("/get/category/:category", getByCategory);
EventRoutes.get("/get/city/:city", getByCity);
EventRoutes.get("/get/date/:date", sortByDateEvent);
EventRoutes.patch("/:id", [isAuth], upload.single("image"), updateEvent);
EventRoutes.delete("/:id", [isAuth], deleteEvent);
EventRoutes.patch("/like/:idEvent", [isAuth], toggleLikeEvent);
EventRoutes.patch("follow/:categoryEvent", [isAuth], toggleFollowEvent);
module.exports = EventRoutes;
