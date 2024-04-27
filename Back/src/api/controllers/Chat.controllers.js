const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Event = require("../models/Events.model");
const Experience = require("../models/Experience.model");
const User = require("../models/User.model");

//! ---------------------------------------------------------------------
//? -------------------------------DELETE MESSAGE -------------------------------
//! ---------------------------------------------------------------------
const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);

    try {
      const messages = await Message.findById({ $in: chat.messages });
      console.log(messages);
      if (messages) {
        try {
          const removeMessageFromExperience = await Experience.updateMany(
            { message: { $in: chat.messages } },
            { $pull: { message: { $in: chat.messages } } }
          );
          try {
            const removeMessageFromChat = await Chat.updateMany(
              { message: { $in: chat.messages } },
              { $pull: { message: { $in: chat.messages } } }
            );
            try {
              const removeMessageFromEvent = await Event.updateMany(
                { message: { $in: chat.messages } },
                { $pull: { message: { $in: chat.messages } } }
              );
              try {
                await User.updateMany(
                  { messagesFav: { $in: chat.messages } },
                  { $pull: { messagesFav: { $in: chat.messages } } }
                );
                await User.updateMany(
                  { postedMessages: { $in: chat.messages } },
                  { $pull: { postedMessages: { $in: chat.messages } } }
                );
                await User.updateMany(
                  { commentsPublicByOther: { $in: chat.messages } },
                  { $pull: { commentsPublicByOther: { $in: chat.messages } } }
                );
                await User.updateMany({ chats: id }, { $pull: { chats: id } });
                try {
                  const messagesDelete = await Message.deleteMany({
                    id: { $in: chat.messages },
                  });
                  await Message.deleteMany();
                  try {
                    const chatDelete = await Chat.findByIdAndDelete(id);
                    // lo buscamos para vr si sigue existiendo o no
                    const finByIdChat = await Chat.findById(id);
                    return res.status(finByIdChat ? 404 : 200).json({
                      deleteTest: finByIdChat ? false : true,
                    });
                  } catch (error) {
                    return res.status(404).json(error.message);
                  }
                } catch (error) {
                  return res.status(404).json({
                    error: "error catch delete messages",
                    message: error.message,
                  });
                }
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
          } catch (error) {
            return res.status(404).json({
              error: "error catch update Chat",
              message: error.message,
            });
          }
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
  } catch (error) {
    return res.status(404).json({
      error: "error catch find Chat",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get chat by id--------------------------
//! ---------------------------------------------------------------------
const getChatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chatById = await Chat.findById(id).populate("messages");
    if (chatById) {
      return res.status(200).json(chatById);
    } else {
      return res.status(404).json("no se ha encontrado el chat");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get chat by user owner--------------------------
//! ---------------------------------------------------------------------

const getChatByUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    let idUserQuery;
    if (idUser) {
      idUserQuery = idUser;
    } else {
      idUserQuery = req.user._id;
    }
    const chatByUser = await Chat.find({
      $or: [{ userOne: idUserQuery }, { userTwo: idUserQuery }],
    }).populate("messages");
    if (chatByUser) {
      return res.status(200).json(chatByUser);
    } else {
      return res.status(404).json("no se ha encontrado ningún chat ");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get all chats------------------------------
//! ---------------------------------------------------------------------

const getAllChats = async (req, res, next) => {
  try {
    const allChats = await Chat.find().populate("messages");
    /** el find nos devuelve un array */
    if (allChats.length > 0) {
      return res.status(200).json(allChats);
    } else {
      return res.status(404).json("no se han encontrado chats");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

module.exports = {
  deleteChat,
  getChatById,
  getChatByUser,
  getAllChats,
};
