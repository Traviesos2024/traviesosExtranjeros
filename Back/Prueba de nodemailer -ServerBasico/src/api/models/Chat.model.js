// 1º requerimos mongoose y traemos la parte de los esquemas de datos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2º Definir el modelo de datos:
// ------------> Le damos a cada clave del objeto el Type (tipo de dato)
// ------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// ------------> que sea requerido, una longitud maxima y minima, etc etc

const ChatSchema = new Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menssage" }],
    userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    /* un array de muchos mensajes por eso va entre [], entre dos usuarios, 
    por eso los usuarios uno y dos van solo con {}, porque son un único objeto*/
  },
  {
    timestamps: true,
  }
);

// 3º Con la definicion de datos y su esquema vamos a crear el modelo de datos

const Chat = mongoose.model("Chat", ChatSchema);

// 4º Exportamos el modelo para que lo utilicen los controladores

module.exports = Chat;
