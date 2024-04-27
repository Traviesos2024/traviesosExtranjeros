const Experience = require("../models/Experience.model");
const Events = require("../models/Events.model");
const City = require("../models/City.models");
const User =require("../models/User.model");

//! -------------create new city ----------------

const createCity = async (req, res, next) => {
  try {
    await City.syncIndexes();

    // hacemos una instancia del modelo, por el body tengo el name, la descripción, la imagen y el número de habitantes/;
    const customBody = {
      name: req.body?.name,
      description: req.body?.description,
      image: req.file?.path,
      numHab: req.body?.numHab,
      country: req.body?.country,
    };
    const newCity = new City(customBody);
    const savedCity = await newCity.save();
    // Obtener el ID de la experiencia creada
    const idCity = savedCity._id;

    // Verificar si el usuario es superAdmin
    if (!req.user) {
      return res.status(401).json({ error: "No eres superAdmin" });
    }

    // test en el runtime
    return res
      .status(savedCity ? 200 : 404) //200 si se ha guardado y 404 si no se ha guardado
      .json(savedCity ? savedCity : "error al crear nueva ciudad ❌");
  } catch (error) {
    return res.status(404).json({
      error: "error catch create city",
      message: error.message,
    });
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------findById------------------------------------
//! -----------------------------------------------------------------------------

const cityById = async (req, res, next) => {
  try {
    /* creamos una constante, apuntamos al modelo y hacemos un findById para buscar por id. 
    El id lo encontramos con req.params y la clave .id. Si no lo encuentra es un null */
    const { idCity } = req.params;
    const cityById = await City.findById(idCity);
    if (cityById) {
      // comprobamos si existe
      return res.status(200).json(cityById); // mandamos un json con el objeto
    } else {
      // si no lo ha encontrado
      return res.status(404).json("city no encontrada"); // mandamos usuario no encontrado
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ----------------------------add o delete un events  --------------
//! ---------------------------------------------------------------------

const toggleEvent = async (req, res, next) => {
  try {
    const { idCity, idEvent } = req.params;

    // Obtener los objetos City y Event por sus IDs
    const city = await City.findById(idCity);
    const event = await Events.findById(idEvent);

    if (!city || !event) {
      return res.status(404).json({ error: "Ciudad o evento no encontrado" });
    }

    if (event.cities.includes(idCity)) {
      try {
        // Actualizar el evento y eliminar la ciudad
        await Events.findByIdAndUpdate(idEvent, { $pull: { cities: idCity } });

        try {
          // Actualizar la ciudad y eliminar el evento
          await City.findByIdAndUpdate(idCity, { $pull: { events: idEvent } });

          return res.status(200).json({
            action: "delete",
            cities: await Events.findById(idEvent).populate("cities"),
            events: await City.findById(idCity).populate("events"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la ciudad - events",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el evento - cities",
          message: error.message,
        });
      }
    } else {
      try {
        // Actualizar el evento y agregar la ciudad
        await Events.findByIdAndUpdate(idEvent, { $push: { cities: idCity } });

        try {
          // Actualizar la ciudad y agregar el evento
          await City.findByIdAndUpdate(idCity, { $push: { events: idEvent } });

          return res.status(200).json({
            action: "events",
            cities: await Events.findById(idEvent).populate("cities"),
            events: await City.findById(idCity).populate("events"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la ciudad - events",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el evento - cities",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! ---------------------------------------------------------------------
//? ----------------------------add o delete un country  --------------
//! ---------------------------------------------------------------------

const toggleCountry = async (req, res, next) => {
  try {
    const { idCity, idCountry } = req.params;

    // Obtener los objetos City y Event por sus IDs
    const city = await City.findById(idCity);
    const country = await Country.findById(idCountry);

    if (!city || !country) {
      return res.status(404).json({ error: "Ciudad o pais no encontrado" });
    }

    if (country.cities.includes(idCity)) {
      try {
        // Actualizar el pais y eliminar la ciudad
        await Country.findByIdAndUpdate(idCountry, {
          $pull: { cities: idCity },
        });

        return res.status(200).json({
          action: "delete",
          cities: await Country.findById(idCountry).populate("cities"),
        });
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el pais - cities",
          message: error.message,
        });
      }
    } else {
      try {
        // Actualizar el evento y agregar la ciudad
        await Country.findByIdAndUpdate(idCountry, {
          $push: { cities: idCity },
        });

        return res.status(200).json({
          action: "country",
          cities: await Country.findById(idCountry).populate("cities"),
        });
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el evento - cities",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const updateCity = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await City.syncIndexes();
    const { idCity } = req.params;
    const cityById = await City.findById(idCity);
    if (cityById) {
      const oldImg = cityById.image;

      const customBody = {
        _id: cityById.idCity,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : characterById.name,
      };

      try {
        await City.findByIdAndUpdate(idCity, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const cityByIdUpdate = await City.findById(idCity);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] === cityByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          cityByIdUpdate.image === catchImg
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }

        /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
         * si no hay ningun false entonces lanzamos un 200 porque todo esta correcte
         */

        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json("esta city no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteCity = async (req, res, next) => {
  try {
    const { idCity } = req.params;
    const city = await City.findByIdAndDelete(idCity);
    if (city) {
      // lo buscamos para ver si sigue existiendo o no
      const findByIdCity = await City.findById(idCity);

      try {
        const test = await Events.updateMany(
          //borra el evento donde estuviera la ciudad

          { city: idCity },
          { $pull: { city: idCity } }
        );
        console.log(test);

        try {
          await User.updateMany(
            //borra el usuario que tenía la city
            { cities: idCity }, //!¿COMO SE LLMA EL ARRAY DE LAS CITIES ENEL USER?
            { $pull: { user: idCity  } } //{ $pull: { user: id} } ---> esto no lo pilla
          );

          return res.status(findByIdCity ? 404 : 200).json({
            deleteTest: findByIdCity ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Event",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createCity,
  cityById,
  toggleEvent,
  updateCity,
  deleteCity,
  toggleCountry,
};
