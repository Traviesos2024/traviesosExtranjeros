const express = require("express");
const {
  createMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/Message.controllers");
const { isAuth } = require("../../middleware/auth.middleware");
const MessageRoutes = express.Router();

MessageRoutes.post("/:idRecipient", [isAuth], createMessage);
MessageRoutes.delete("/:id", [isAuth], deleteMessage);
MessageRoutes.patch("/:id", [isAuth], updateMessage);
module.exports = MessageRoutes;
