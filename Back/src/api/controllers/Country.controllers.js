const {deleteImgCloudinary} = require("../../middleware/files.middleware");
const User = require("../models/User.model");
const Country = require("../models/Country.models");
const City = require("../models/City.models");

const createCountry = async (req, res, next) => {
  try {
    await Country.syncIndexes();

    // Creamos una instancia del modelo Country
    const customBody = {
      name: req.body?.name,
      description: req.body?.description,
      image: req.file?.path,
      tipicalFood: req.body?.tipicalFood,
      traditions: req.body?.traditions,
    };
    const newCountry = new Country(customBody);
    const savedCountry = await newCountry.save();
    const idCountry = savedCountry._id;

    // Verificamos si hay un usuario autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Obtenemos el ID de la ciudad del cuerpo de la solicitud
    const cityId = req.body.cityId;

    // Actualizamos la clave country de la ciudad con el ID del país
    await City.findByIdAndUpdate(cityId, {
      $push: { country: idCountry },
    });

    // Devolvemos el usuario actualizado
    const updatedCity = await City.findById(cityId).populate("country");
    return res.status(200).json({
      action: "update",
      cities: updatedCity,
    });
  } catch (error) {
    return res.status(404).json({
      error: "No se ha actualizado el país creado",
      message: error.message,
    });
  }
};


//! -----------------------------------------------------------------------------
//? ---------------------------------findById------------------------------------
//! -----------------------------------------------------------------------------

const countryById = async (req, res, next) => {
  try {
    /* creamos una constante, apuntamos al modelo y hacemos un findById para buscar por id. 
    El id lo encontramos con req.params y la clave .id. Si no lo encuentra es un null */
    const { idCountry } = req.params;
    const countryById = await Country.findById(idCountry);
    if (countryById) {
      // comprobamos si existe
      return res.status(200).json(countryById); // mandamos un json con el objeto
    } else {
      // si no lo ha encontrado
      return res.status(404).json("country no encontrado"); // mandamos usuario no encontrado
    }
  } catch (error) {
    return next(error);
  }
};


//! -----------------------------------------------------------------------------
//? ---------------------------------findById------------------------------------
//! -----------------------------------------------------------------------------

// const byId = async (req, res, next) => {
//   try {
//     /* creamos una constante, apuntamos al modelo y hacemos un findById para buscar por id. 
//     El id lo encontramos con req.params y la clave .id. Si no lo encuentra es un null */
//     const { idCountry } = req.params;
//     const countryById = await Country.findById(idCountry);
//     if (countryById) {
//       // comprobamos si existe
//       return res.status(200).json(countryById); // mandamos un json con el objeto
//     } else {
//       // si no lo ha encontrado
//       return res.status(404).json("country no encontrado"); // mandamos usuario no encontrado
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const update = async (req, res, next) => {
  try {
    const { idCountry } = req.params;
    const countryById = await Country.findById(idCountry);

    if (!countryById) {
      return res.status(404).json("Esta country no existe");
    }

    // Verificar si se ha subido una nueva imagen
    let catchImg;
    if (req.file) {
      catchImg = req.file.path;
    } else {
      return res.status(400).json("Debes subir una imagen para actualizar");
    }

    // Actualizar solo la imagen de la experiencia
    const updatedCountry = await Country.findByIdAndUpdate(
      idCountry,
      { image: catchImg },
      { new: true }
    );

    // Eliminar la antigua imagen de Cloudinary
    deleteImgCloudinary(countryById.image);

    return res.status(200).json({ updatedCountry });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteCountry = async (req, res, next) => {
  try {
    const { idCountry } = req.params;
    const country = await Country.findByIdAndDelete(idCountry);
    if (!country) {
      // lo buscamos para ver si sigue existiendo o no
      return res.status(404).json({ error: "Country no encontrado" });
    }

      try {
        await City.updateMany(
          //borra la ciudad donde estuviera el pais
          { country: idCountry },
          { $pull: { country: idCountry } }
        );
        console.log(test);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Error al actualizar cities", message: error.message });
      }

        try {
          await User.updateMany(
            //borra el usuario que tenía el country
            { country: idCountry }, 
            { $pull: { country: idCountry } }
          );

          return res.status(200).json({ deletedCountryId: idCountry });
        } catch (error) {
          return res.status(500).json({
            error: "Error al actualizar usuarios",
            message: error.message,
          });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Error al eliminar país", message: error.message });
      }
    };
  
    

module.exports = {
  createCountry,
  countryById,
  update,
  deleteCountry,
};
