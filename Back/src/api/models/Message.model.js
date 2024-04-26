//! --------- nos requerimos mongoose---
const mongoose = require("mongoose");

//! ----------nos traemos de mongoose la parte de los esquemas de datos

const Schema = mongoose.Schema;

//! --------- creamos los esquemas de datos

// Definir el modelo de datos:
// ------------> Le damos a cada clave del objeto el Type (tipo de dato)
// ------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// ------------> que sea requerido, una longitud maxima y minima, etc etc

const MessageSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["private", "public"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recipientEvents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    recipientExperience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
    },
    recipientUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

//! -------- con la definicion de datos y su esquema vamos a crear el modelo de datos

const Message = mongoose.model("Message", MessageSchema);

//! -------- exportar el modelo para que lo utilicen los controladores

module.exports = Message;
