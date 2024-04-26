const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Experience = require("../models/Experience.model");
const User = require("../models/User.model");
const enumMessageTypeOk = require("../../utils/enumMessageTypeOk");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createMessage = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { idRecipient } = req.params; // -----> id de a quien quiero hacer el comentario
    /**
     * idRecipient puede ser el id de : experience, user
     */

    const findUser = await User.findById(idRecipient);
    const findExperience = await Experience.findById(idRecipient);

    /**
     * cuando no lo encuentre devuelve un null y el que encuentre va a devolver el objeto encontrado
     *
     */

    if (findUser) {
      const newMessage = new Message(req.body);
      const savedMessage = await newMessage.save();

      if (type == "private") {
        try {
          const chatExistOne = await Chat.findOne({
            userOne: req.user._id,
            userTwo: findUser._id,
          });
          const chatExistTwo = await Chat.findOne({
            userOne: findUser._id,
            userTwo: req.user._id,
          });

          /**
           * si no tengo ningun chat abierto con el otro usuario ambas constantes
           * serán null
           *
           * Si tengo abierto un chat con ese usuario una de las dos constantes tendra valor y la
           * otra sera null
           */

          if (chatExistOne != null || chatExistTwo != null) {
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ---------------------------- CHAT EXISTE: TENEMOS QUE ACTUALIZARLO -------------------------------------
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            ///&/ existe un chat y entonces lo actualizamos conm el nuevo mensaje

            if (chatExistOne) {
              try {
                await chatExistOne.updateOne({
                  /** podemos hacer un push */
                  $push: { messages: newMessage._id },
                });
                try {
                  await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                      postedMessages: newMessage._id,
                    },
                  });
                  await User.findByIdAndUpdate(findUser._id, {
                    $push: {
                      commentsPublicByOther: newMessage._id,
                    },
                  });
                  return res.status(200).json({
                    chat: await Chat.findById(chatExistOne._id).populate(
                      "messages  userOne  userTwo"
                    ),
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user en la clave postedMessages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                await Message.findByIdAndDelete(savedMessage._id);
                return res
                  .status(404)
                  .json(
                    "error en actualizar el chat existente, elimino el comentario"
                  );
              }
            } else {
              try {
                await chatExistTwo.updateOne({
                  $push: { messages: newMessage._id },
                });

                try {
                  await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                      postedMessages: newMessage._id,
                    },
                  });
                  await User.findByIdAndUpdate(findUser._id, {
                    $push: {
                      commentsPublicByOther: newMessage._id,
                    },
                  });
                  return res.status(200).json({
                    chat: await Chat.findById(chatExistTwo._id).populate(
                      "messages  userOne  userTwo"
                    ),
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user en la clave postedMessages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                try {
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el coment  ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            }
          } else {
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ---------------------------- CREAR CHAT PORQUE NO EXISTE NINGUNO ---------------------------------------
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            /// crear un chat con el comentario que hemos creado

            const newChat = new Chat({
              userOne: req.user._id,
              userTwo: findUser._id,
              messages: [savedMessage._id],
            });

            try {
              await newChat.save();

              try {
                await User.findByIdAndUpdate(req.user._id, {
                  $push: {
                    postedMessages: newMessage._id,
                    chats: newChat._id,
                  },
                });

                try {
                  await User.findByIdAndUpdate(idRecipient, {
                    $push: {
                      commentsPublicByOther: newMessage._id,
                      chats: newChat._id,
                    },
                  });

                  return res.status(200).json({
                    chat: await Chat.findById(newChat._id).populate(
                      "messages  userOne  userTwo"
                    ),
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user que recibe el comentario la clave chat",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                return res.status(404).json({
                  error:
                    "no hemos actualizado el user el dueño del mensaje en la clave postedMessages y en la clave chats",
                  idMessage: newMessage._id,
                });
              }
            } catch (error) {
              // lo borramos porque no nos ha enviado bien el tipo
              try {
                await Message.findByIdAndDelete(savedMessage._id);
                return res.status(404).json(error.message);
              } catch (error) {
                return res.status(404).json({
                  error:
                    "no se ha creado el chat pero no se ha borrado el comentario",

                  idMensageNoBorrado: savedMessage._id,
                });
              }
            }
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else if (type == "public") {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $push: {
              postedMessages: newMessage._id,
            },
          });

          try {
            await User.findByIdAndUpdate(idRecipient, {
              $push: {
                commentsPublicByOther: newMessage._id,
              },
            });

            return res.status(200).json({
              userOwner: await User.findById(req.user._id).populate([
                {
                  path: "chats",
                  model: Chat,
                  populate: "messages userOne userTwo",
                },
              ]),
              recipient: await User.findById(idRecipient),
              comentario: newMessage._id,
            });
          } catch (error) {
            return res.status(404).json({
              error:
                "error catch update quien recibe el comentario  -  commentsPublicByOther",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error:
              "error catch update quien hace el comentario  -  postedMessages",
            message: error.message,
          });
        }
      } else {
        return res.status(404).json("no has puesto el tipo correctamente");
      }
    } else if (findExperience) {
      if (type == "private") {
        return res.status(404).json("no puedes hacer comentarios privados");
      } else {
        try {
          const newMessage = new Message(req.body);
          const savedMessage = await newMessage.save();

          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                postedMessages: newMessage._id,
              },
            });

            try {
              await Experience.findByIdAndUpdate(findExperience._id, {
                $push: { comments: newMessage._id },
              });

              return res.status(200).json({
                userOwner: await User.findById(req.user._id).populate(
                  "postedMessages"
                ),
                Experience: await Experience.findById(
                  findExperience._id
                ).populate("comments"),
              });
            } catch (error) {
              return res.status(404).json({
                error: "error catch update Experience - comments",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error:
                "error catch update userOwner del comentario  -  postedMessages",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error catch save message",
            message: error.message,
          });
        }
      }
    }
  } catch (error) {
    return next(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE MESSAGE -------------------------------
//! ---------------------------------------------------------------------
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (message) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdMessage = await Message.findById(id);

      try {
        const test = await Experience.updateMany(
          { message: id },
          { $pull: { message: id } }
        );
        try {
          const removeMessageFromChat = await Chat.updateMany(
            { messages: id },
            { $pull: { messages: id } }
          );
          try {
            await User.updateMany(
              { messagesFav: id },
              { $pull: { messagesFav: id } }
            );
            await User.updateMany(
              { postedMessages: id },
              { $pull: { postedMessages: id } }
            );
            await User.updateMany(
              { commentsPublicByOther: id },
              { $pull: { commentsPublicByOther: id } }
            );

            return res.status(finByIdMessage ? 404 : 200).json({
              deleteTest: finByIdMessage ? false : true,
            });
          } catch (error) {
            return res.status(404).json({
              error: "error catch update User",
              message: error.message,
            });
          }
        } catch (error) {}
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Experience",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE MESSAGE -------------------------------
//! ---------------------------------------------------------------------

const updateMessage = async (req, res, next) => {
  try {
    await Message.syncIndexes();
    const { id } = req.params;
    const messageById = await Message.findById(id);
    if (messageById) {
      const customBody = {
        _id: messageById._id,
        content: req.body?.content ? req.body?.content : messageById.content,
      };

      if (req.body?.type) {
        const resultEnum = enumMessageTypeOk(req.body?.type);
        customBody.type = resultEnum.check ? req.body?.type : messageById.type;
      }

      try {
        await Message.findByIdAndUpdate(id, customBody);

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const messageByIdUpdate = await Message.findById(id);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] === messageByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

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
      return res.status(404).json("este mensaje no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createMessage, deleteMessage, updateMessage };
