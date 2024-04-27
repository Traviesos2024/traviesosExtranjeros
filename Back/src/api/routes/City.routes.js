const express = require("express");

const { isAuth, isAuthSuper } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  createCity,
  cityById,
  toggleEvent,
  updateCity,
  deleteCity,
} = require("../controllers/City.controller");
const CityRoutes = express.Router();

CityRoutes.post("/create", [isAuthSuper], upload.single("image"), createCity);
CityRoutes.get("/finById/:idCity", cityById);
CityRoutes.patch("/addCity/:idCity", [isAuth], toggleEvent);
CityRoutes.patch(
  "/update/:idCity",
  [isAuth],
  upload.single("image"),
  updateCity
);
CityRoutes.delete("/:idCity", [isAuth], deleteCity);

module.exports = CityRoutes;
