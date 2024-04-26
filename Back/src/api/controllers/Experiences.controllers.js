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

module.exports = { toggleLikeExperience, createExperience, toggleEvent };
