const Experience = require("../models/Experience.model");
const Events = require("../models/Events.model");
const City = require("../models/City.models");

//! -------------create new experiencie ----------------

const createCity = async (req, res, next) => {
  try {
    await City.syncIndexes();

    / hacemos una instancia del modelo, por el body tengo el name, la descripción, la imagen y el número de habitantes/;
    const customBody = {
      name: req.body?.name,
      description: req.body?.description,
      image: req.file?.path,
      numHab: req.body?.numHab,
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
      return res.status(404).json("experiencia no encontrado"); // mandamos usuario no encontrado
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? ----------------------------add o delete un events  --------------
//! ---------------------------------------------------------------------
/// aqui metemos los personajes en el array del modelo de movie
const toggleEvent = async (req, res, next) => {
  try {
    /** este id es el id de la city en el que queremos añadir */
    const { idCity } = req.params;
    const { events } = req.body; // -----> idDeLosEvents enviaremos esto por el req.body

    /** Buscamos la ciudad por id para saber si existe */
    const cityById = await City.findById(idCity);

    if (cityById) {
      /** cogeemos el string que traemos del body y lo convertimos en un array
       * separando las posiciones donde en el string habia una coma
       * se hace mediante el metodo del split
       */

      const arrayIdEvent = Events.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos quee:
       * 1) ----> sacar eel character si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */

      Promise.all(
        arrayIdEvent.map(async (events, index) => {
          if (cityById.events.includes(events)) {
            //BORRAR DEL ARRAY DE EVENTS EL EVENTO DENTRO DE LA CIUDAD

            try {
              await City.findByIdAndUpdate(idCity, {
                // dentro de la clavee event me vas a sacar el id del elemento que estoy recorriendo
                $pull: { events: events },
              });

              try {
                await Events.findByIdAndUpdate(events, {
                  $pull: { city: idCity },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update event",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update city",
                message: error.message,
              }) && next(error);
            }
          } else {
            //________ METER EL EVENTO EN EL ARRAY DE EVENTO DE LA CIUDAD_________________

            try {
              await City.findByIdAndUpdate(idCity, {
                $push: { events: events },
              });
              try {
                await Events.findByIdAndUpdate(events, {
                  $push: { city: idCity },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update event",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update city",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await City.findById(idCity).populate("events"),
          });
        });
    }
  } catch (error) {
    return res.status(404).json(error.message);
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
            { charactersFav: id }, //!¿COMO SE LLMA EL ARRAY DE LAS CITIES ENEL USER?
            { $pull: { charactersFav: id } }
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
};
