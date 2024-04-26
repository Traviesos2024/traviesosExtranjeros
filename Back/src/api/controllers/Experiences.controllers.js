const Experience = require("../models/Experience.model");
const User = require("../models/User.model");
const Chat = require("../models/Chat.model");
const Event = require("../models/Events.model");

//! -------------create new experiencie ----------------

const createExperience = async (req, res, next) => {
  try {
    await Experience.syncIndexes();

    /** hacemos una instancia del modelo, por el body tengo el name y la descripción*/
    const customBody = {
      name: req.body?.name,
      description: req.body?.description,
      image: req.file?.image,
    };
    const newExperiencie = new Experience(customBody);
    const savedExperience = await newExperiencie.save();
    // Obtener el ID de la experiencia creada
    const idExperience = savedExperience._id;

    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    try {
      const userId = req.user._id;

      // Actualizar la clave experiencesOwner del usuario con el ID de la experiencia
      await User.findByIdAndUpdate(userId, {
        $push: { experiencesOwner: idExperience },
      });

      // Devolver el usuario actualizado
      const updatedUser = await User.findById(userId).populate(
        "experiencesOwner"
      );

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
      error: "error catch create experience",
      message: error.message,
    });
  }
};

//! -------------like experiencie ----------------

const toggleLikeExperience = async (req, res, next) => {
  try {
    const { idExperience } = req.params; //De donde saco el id de la experiencia??
    // Necesitamos estar logado para darle like
    const { _id } = req.user;
    // const { _id } = req.body;

    if (req.user.experiencesFav.includes(idExperience)) {
      try {
        await User.findByIdAndUpdate(_id, {
          //Actualiza el usuario e incluye su experiencia fav
          $pull: { experiencesFav: idExperience },
        });

        try {
          await Experience.findByIdAndUpdate(idExperience, {
            //Actualiza la experiencia y añade el usuario que le ha dado like
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("experiencesFav"),
            experience: await Experience.findById(idExperience).populate(
              "likes"
            ),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la experiencia - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el usuario -  experiencesFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          //Saca el id de la experiencia cuando le doy dislike
          $push: { experiencesFav: idExperience },
        });

        try {
          await Experience.findByIdAndUpdate(idExperience, {
            //Saca el id del usuario en la experiencia cuanod le doy dislike
            $push: { likes: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("experiencesFav"),
            experience: await Experience.findById(idExperience).populate(
              "likes"
            ),
          });
        } catch (error) {
          return res.status(404).json({
            error: "No se ha actualizado la experiencia - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "No se ha actualizado el usuario -  experiencesFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//!-----------------------A FALTA DE PROBAR CUANDO ESTÉ EN EVENT-----------------------
//! -------------add/delete event que ha hecho la experience ----------------

const toggleEvent = async (req, res, next) => {
  try {
    /** este es el id de la experiencia que queremos actualizar */
    const { idExperience } = req.params;
    //req.body; No sé si el user va por el req.user o se metería por el body
    //! const { _id } = req.user; // -----> idDeLosUser, tienes que estar logado para añadirte como que la has hecho
    const { events } = req.body;

    /** Buscamos la experiencia por su id primero para saber si existe */
    const experienceById = await Experience.findById(idExperience);

    if (experienceById) {
      /** cogemos el string que traemos del body y lo convertimos en un array
       * separando las posiciones donde en el string habia una coma
       * se hace mediante el metodo del split
       */

      //!const arrayIdUser = _id.split(",");
      const arrayIdEvent = events.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el user si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */

      Promise.all(
        arrayIdEvent.map(async (event, index) => {
          if (experienceById.events.includes(event)) {
            //! arrayIdUser.map(async (_id, index) => {
            //! if (experienceById._id.includes(_id)) {
            //*************************************************************************** */

            //________ BORRAR DEL ARRAY DE USER EL USER DENTRO DE LA EXPERIENCE

            //*************************************************************************** */

            try {
              await Experience.findByIdAndUpdate(idExperience, {
                // dentro de la clavee users me vas a sacar el id del elemento que estoy recorriendo
                // !$pull: { user: _id },
                $pull: { events: event },
              });

              try {
                await Events.findByIdAndUpdate(event, {
                  $pull: { events: idExperience },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update user",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update experience",
                message: error.message,
              }) && next(error);
            }
          } else {
            //*************************************************************************** */
            //________ METER EL user EN EL ARRAY DE user DE LA experience
            //*************************************************************************** */
            /** si no lo incluye lo tenemos que meter -------> $push */

            try {
              await Experience.findByIdAndUpdate(idExperience, {
                $push: { events: event },
              });
              try {
                await Events.findByIdAndUpdate(event, {
                  $push: { events: idExperience },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update user",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update experience",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Experience.findById(idExperience).populate(
              "users"
            ),
          });
        });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------findById------------------------------------
//! -----------------------------------------------------------------------------

const byId = async (req, res, next) => {
  try {
    /* creamos una constante, apuntamos al modelo y hacemos un findById para buscar por id. 
    El id lo encontramos con req.params y la clave .id. Si no lo encuentra es un null */
    const { idExperience } = req.params;
    const experienceById = await Experience.findById(idExperience);
    if (experienceById) {
      // comprobamos si existe
      return res.status(200).json(experienceById); // mandamos un json con el objeto
    } else {
      // si no lo ha encontrado
      return res.status(404).json("experiencia no encontrado"); // mandamos usuario no encontrado
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
  // capturamos la imagen nueva subida a cloudinary
  let catchImg = req.file?.path;

  try {
    // actualizamos los elementos unique del modelo
    await Experience.syncIndexes();

    // instanciamos un nuevo objeto del modelo de experience con el req.body
    const patchExperience = new Experience(req.body);

    // si tenemos imagen metemos a la instancia del modelo esta imagen nueva que es lo que capturamos en catchImg
    req.file && (patchExperience.image = catchImg);

    /** vamos a salvaguardar info que no quiero que el usuario pueda cambiarme */
    // AUNQUE ME PIDA CAMBIAR ESTAS CLAVES NO SE LO VOY A CAMBIAR
    patchExperience._id = req.user._id;
    patchExperience.name = req.user.name;
    patchExperience.description = req.user.description;
    patchExperience.events = req.user.events;

    try {
      /** hacemos una actualizacion NO HACER CON EL SAVE
       * le metemos en el primer valor el id de el objeto a actualizar
       * y en el segundo valor le metemos la info que queremos actualizar
       */
      await Experience.findByIdAndUpdate(req.user._id, patchExperience);

      // si nos ha metido una imagen nueva y ya la hemos actualizado pues tenemos que borrar la antigua
      // la antigua imagen la tenemos guardada con el usuario autenticado --> req.user
      if (req.file) deleteImgCloudinary(req.user.image);

      // ++++++++++++++++++++++ TEST RUNTIME+++++++++++++++++++++++++++++++++++++++
      /** siempre lo pprimero cuando testeamos es el elemento actualizado para comparar la info que viene
       * del req.body
       */
      const updateExperience = await Experience.findById(req.user._id);

      /** sacamos las claves del objeto del req.body para saber que info nos han pedido actualizar */
      const updateKeys = Object.keys(req.body); // ["name"]

      // creamos un array donde guardamos los test
      const testUpdate = [];

      // recorremos el array de la info que con el req.body nos dijeron de actualizar
      /** recordar este array lo sacamos con el Object.keys */

      // updateKeys ES UN ARRAY CON LOS NOMBRES DE LAS CLAVES = ["name", "email", "rol"]

      ///----------------> para todo lo diferente de la imagen ----------------------------------
      updateKeys.forEach((item) => {
        /** vamos a comprobar que la info actualizada sea igual que lo que me mando por el body... */
        if (updateExperience[item] === req.body[item]) {
          /** aparte vamos a comprobar que esta info sea diferente a lo que ya teniamos en mongo subido antes */
          if (updateExperience[item] != req.user[item]) {
            // si es diferente a lo que ya teniamos lanzamos el nombre de la clave y su valor como true en un objeto
            // este objeto see pusea en el array que creamos arriba que guarda todos los testing en el runtime
            testUpdate.push({
              [item]: true,
            });
          } else {
            // si son igual lo que pusearemos sera el mismo objeto que arrriba pro diciendo que la info es igual
            testUpdate.push({
              [item]: "sameOldInfo",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      /// ---------------------- para la imagen ---------------------------------
      if (req.file) {
        /** si la imagen del user actualizado es estrictamente igual a la imagen nueva que la
         * guardamos en el catchImg, mandamos un objeto con la clave image y su valor en true
         * en caso contrario mandamos esta clave con su valor en false
         */
        updateExperience.image === catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }

      /** una vez finalizado el testing en el runtime vamos a mandar el usuario actualizado y el objeto
       * con los test
       */
      return res.status(200).json({
        updateExperience,
        testUpdate,
      });
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteExperience = async (req, res, next) => {
  try {
    const { idExperience } = req.params;

    const experience = await Experience.findByIdAndDelete(idExperience);
    if (experience) {
      // lo buscamos para vr si sigue existiendo o no
      const findByIdExperience = await Experience.findById(idExperience);

      try {
        const test = await Events.updateMany(
          //!!!Falta linkear el evento modelo
          //borramos la experiencia de los eventos que tenga.
          { experience: idExperience },
          { $pull: { experience: idExperience } }
        );
        console.log(test);

        try {
          await User.updateMany(
            //borramos la experiencia de los usuarios
            { experience: idExperience },
            { $pull: { experience: idExperience } }
          );

          return res.status(findByIdExperience ? 404 : 200).json({
            deleteTest: findByIdExperience ? false : true,
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
  toggleLikeExperience,
  createExperience,
  toggleEvent,
  byId,
  update,
  deleteExperience,
};
