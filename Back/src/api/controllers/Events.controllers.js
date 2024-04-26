const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");
const Event = require("../models/Events.model");
/*const Event = require("../models/Event.model");*/
const User = require("../models/User.model");
//*const City= require("../models"/City.model");
//*const Country= require("../models/Country.model");

//! -------------create new event ----------------

const createEvent = async (req, res, next) => {
  try {
    await Event.syncIndexes();

    /** hacemos una instancia del modelo, por el body tengo el name y la descripción*/
    const customBody = {
      name: req.body?.name,
      description: req.body?.description,
      image: req.file?.image,
    };
    const newExperiencie = new Event(customBody);
    const savedEvent = await newExperiencie.save();
    // Obtener el ID de la evvento creada
    const idEvent = savedEvent._id;

    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    try {
      const userId = req.user._id;

      // Actualizar la clave ExperienceOwner del usuario con el ID del evento
      await User.findByIdAndUpdate(userId, {
        $push: { EventsOwner: idEvent },
      });

      // Devolver el usuario actualizado
      const updatedUser = await User.findById(userId).populate("EventsOwner");

      return res.status(200).json({
        action: "update",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(404).json({
        error: "No se ha actualizado la experiencia creada - user",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "error catch create Event",
      message: error.message,
    });
  }
};

//! -------------like experiencie ----------------

const toggleLikeEvent = async (req, res, next) => {
  try {
    const { idEvents } = req.params; //De donde saco el id de la experiencia??
    // Necesitamos estar logado para darle like
    const { _id } = req.user;
    // const { _id } = req.body;

    if (req.user.eventsFav.includes(idEvents)) {
      try {
        await User.findByIdAndUpdate(_id, {
          //Actualiza el usuario e incluye su experiencia fav
          $pull: { eventsFav: idEvents },
        });

        try {
          await Events.findByIdAndUpdate(idEvents, {
            //Actualiza la experiencia y añade el usuario que le ha dado like
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("eventsFav"),
            events: await Events.findById(idEvetns).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la experiencia - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el usuario -  eventsFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          //Saca el id de la experiencia cuando le doy dislike
          $push: { eventsFav: idevent },
        });

        try {
          await Events.findByIdAndUpdate(idEvents, {
            //Saca el id del usuario en la experiencia cuanod le doy dislike
            $push: { likes: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("eventsFav"),
            events: await Events.findById(idEvents).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la experiencia - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el usuario -  eventsFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
// // /*//? -------------------------------POST create --------------------------
// // const createEvent = async (req, res, next) => {
// //   /// *Se captura la url de la imagen de Cloudinary por si se diera el error de que en como la imagen se sube antes de meternos al controlador
// //   //*si hay un error en el controlador, una vez dentro, el elemento no se crea y por ende
// //   //*tenmos que borrar la imagen en cloudinary */

// //   //** El optional chaining se pone porque la imagen no es obligatoria por lo cual
// //   //* puede ser que no tengamos req.file.path

// //   let catchImg = req.file?.path;
// //   try {
// //     //! -----> ACTUALIZAR INDEXES
// //     /** los indexes se forman cuando una clave del objeto es unique, se puede ver en la
// //      * parte de mongo que esta al lado de find
// //      *
// //      * Esto es importante porque puede que haya modificado el modelo posteriormente a la
// //      * creacion del controlador
// //      */

// //     await Event.syncIndexes();
// //     //! ------> INSTANCIAR UN NUEVO CHARACTER
// //     /** vamos a instanciar un nuevo character y le metemos como info incial lo que recibimos
// //      * por la req.body
// //      */
// //     const newEvent = new Event(req.body);

// //     //! -------> VALORAR SI HEMOS RECIBIDO UNA IMAGEN O NO
// //     /** Si recibimos la imagen tenemos que meter la url en el objeto creado arriba con la
// //      * nueva instancia del Character
// //      */

// //     if (req.file) {
// //       newEvent.image = catchImg;
// //     } else {
// //       newEvent.image =
// //         "https://res.cloudinary.com/dyl5cabrr/image/upload/v1714138030/ac5016f6-7afd-43f8-9d87-f38c82e5a9f1_16-9-discover-aspect-ratio_default_0_gkuvqg.jpg";
// //     }

// //     try {
// //       //! ------------> VAMOS A GUARDAR LA INSTANCIA DEL NUEVO EVENTO
// //       const saveEvent = await newEvent.save();
// //       if (saveEvent) {
// //         /** Si existe vamos a enviar un 200 como que todo esta ok y le enviamos con un json
// //          * el objeto creado
// //          */

// //         return res.status(200).json(saveEvent);
// //       } else {
// //         return res
// //           .status(404)
// //           .json("No se ha podido guardar el elemento en la DB ❌");
// //       }
// //     } catch (error) {
// //       return res.status(404).json("error general saved event");
// //     }
// //   } catch (error) {
// //     //! -----> solo entramos aqui en el catch cuando ha habido un error
// //     /** SI HA HABIDO UN ERROR -----
// //      * Tenemos que borrar la imagen en cloudinary porque se sube antes de que nos metamos en
// //      * el controlador---> porque es un middleware que esta entre la peticion del cliente y el controlador
// //      */

// //     req.file?.path && deleteImgCloudinary(catchImg);

// //     return (
// //       res.status(404).json({
// //         messege: "error en el creado del elemento",
// //         error: error.message,
// //       }) && next(error)
// //     );
// //   }
// // };

//? -------------------------------get by category--------------------------

// *filtrar los eventos por su tipología//
const getByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const eventByCategory = await Event.findByCategory(category);
    if (eventByCategory) {
      return res.status(200).json(eventByCategory);
    } else {
      return res.status(404).json("no se ha encontrado el evento");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//? -------------------------------get by city--------------------------

// *filtrar los eventos por ciudades//
const getByCity = async (req, res, next) => {
  try {
    const { city } = req.params;
    const eventByCity = await Event.findByCity(city);
    if (eventByCity) {
      return res.status(200).json(eventByCity);
    } else {
      return res.status(404).json("no se ha encontrado la ciudad");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//? -------------------------------get all------------------------------

const getAll = async (req, res, next) => {
  try {
    const allEvent = await Event.find().populate("movies");
    /** el find nos devuelve un array */
    if (allEvent.length > 0) {
      return res.status(200).json(allEvent);
    } else {
      return res.status(404).json("no se han encontrado characters");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

//? -------------------------------get by name --------------------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    /// nos devuelve un array de elementos
    const eventByName = await Event.find({ name });
    if (characterByName.length > 0) {
      return res.status(200).json(eventByName);
    } else {
      return res.status(404).json("no se ha encontrado");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar por nombre capturado en el catch",
      message: error.message,
    });
  }
};

//? -------------------------------toggle like Event --------------------------

// const toggleLikeEvent = async (req, res, next) => {
//   try {
//     const { categoryEvent } = req.params;
//     //* vamos a tener el middleware de auth por lo cual se crea req.user
//     const { _id } = req.user;

//     if (req.user.eventFav.includes(categoryEvent)) {
//       try {
//         await User.findByIdAndUpdateEvent(_id, {
//           $pull: { eventFav: categoryEvent },
//         });

//         try {
//           await Event.findByCategoryAndUpdateEvent(categoryEvent, {
//             $pull: { likes: _id },
//           });

//           return res.status(200).json({
//             action: "disliked",
//             user: await User.findById(_id).populate("eventFav"),
//             event: await Event.findById(idEvent).populate("likes"),
//           });
//         } catch (error) {
//           return res.status(404).json({
//             error: "no update Event - likes",
//             message: error.message,
//           });
//         }
//       } catch (error) {
//         return res.status(404).json({
//           error: "no update user-  EventFav",
//           message: error.message,
//         });
//       }
//     } else {
//       try {
//         await User.findByIdAndUpdateEvent(_category, {
//           $push: { eventFav: categoryEvent },
//         });

//         try {
//           await Event.findByIdAndUpdate(categoryEvent, {
//             //*categoryEventEvent
//             $push: { likes: _type },
//           });

//           return res.status(200).json({
//             action: "like",
//             user: await User.findById(_category).populate("eventsFav"),
//             event: await Event.findByCategory(categoryEvent).populate("likes"),
//           });
//         } catch (error) {
//           return res.status(404).json({
//             error: "no update Event - likes",
//             message: error.message,
//           });
//         }
//       } catch (error) {
//         return res.status(404).json({
//           error: "no update user-  eventFav",
//           message: error.message,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(404).json(error.message);
//   }
// };

//? -------------------------------toggle Follow event--------------------------

const toggleFollowEvent = async (req, res, next) => {
  try {
    const { categoryEvent } = req.params;
    //* vamos a tener el middleware de auth por lo cual se crea req.user
    const { _id } = req.user;

    if (req.user.eventFav.includes(categoryEvent)) {
      try {
        await User.findByIdAndUpdateEvent(_id, {
          $pull: { eventFav: categoryEvent },
        });

        try {
          await Event.findByCategoryAndUpdateEvent(categoryEvent, {
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "unfollow",
            user: await User.findById(_id).populate("eventFav"),
            event: await Event.findById(idEvent).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update Event - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  EventFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdateEvent(_category, {
          $push: { eventFav: categoryEvent },
        });

        try {
          await Event.findByIdAndUpdate(categoryEvent, {
            //*categoryEventEvent
            $push: { likes: _type },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_category).populate("eventsFav"),
            event: await Event.findByCategory(categoryEvent).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update Event - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  eventFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//? -------------------------------sort country event --------------------------

// const sortByCountryEvent = async (req, res, next) => {
//   const country = req.body.date;

//   if (!country || !Array.isArray(country)) {
//     return res.status(400).json ({error:})
//   }
// };

//? -------------------------------UPDATE -------------------------------

const updateEvent = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Event.syncIndexes();
    const { type } = req.params;
    const eventByType = await Event.findByType(type);
    if (eventByType) {
      //*eventByTypeByType//
      const oldImg = eventByType.image;

      const customBody = {
        _type: eventByType._type,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : eventByType.name,
      };

      if (req.body?.category) {
        //* cambiamos gender por category dada la modificación del modelo de Event//
        const resultEnum = enumOk(req.body?.category);
        customBody.category = resultEnum.check
          ? req.body?.category
          : eventByType.category;
      }

      try {
        await Event.findByTypeAndUpdateEvent(type, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID //* modificado por type//

        const eventByTypeUpdateEvent = await Event.findByType(type);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdateEvent = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdateEvent.forEach((item) => {
          if (req.body[item] === eventByTypeUpdateEvent[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          eventByIdUpdateEvent.image === catchImg //*
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }

        //* vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
        //* si no hay ningun false entonces lanzamos un 200 porque todo esta correcte

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
      return res.status(404).json("este character no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//? -------------------------------DELETE -------------------------------

const deleteEvent = async (req, res, next) => {
  try {
    const { type } = req.params;
    const event = await Event.findByTypeAndDelete(type);
    if (event) {
      // lo buscamos para vr si sigue existiendo o no
      const findByTypeEvent = await Event.findByType(type);

      try {
        const test = await Movie.updateMany(
          { event: type },
          { $pull: { event: type } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { eventFav: type },
            { $pull: { eventFav: type } }
          );

          return res.status(findByTypeEvent ? 404 : 200).json({
            deleteTest: findByTypeEvent ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Movie",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
module.exports = {
  createEvent,
  getByCategory,
  getByCity,
  getAll,
  getByName,
  updateEvent,
  deleteEvent,
  toggleLikeEvent,
  toggleFollowEvent,
  // sortByDateEvent,
};
