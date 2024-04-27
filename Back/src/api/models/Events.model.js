const mongoose = require("mongoose");

//* ----------nos traemos de mongoose la parte de los esquemas de datos

const Schema = mongoose.Schema;

//* --------- creamos los esquemas de datos

// *Definir el modelo de datos:
// *------------> Le damos a cada clave del objeto el Type (tipo de dato)
// *------------> definimos otras propiedades que limitan la informacion que se puede incluir en esa clave
// *------------> que sea requerido, una longitud maxima y minima, etc etc

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    category: {
      type: String,
      enum: ["deportes", "musica", "gastronomia", "otros"],
    },
    image: { type: String, require: true },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menssage" }],
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    likeEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    eventFollow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
  },
  {
    timestamps: true,
  }
);

//*-------- con la definicion de datos y su esquema vamos a crear el modelo de datos

const Events = mongoose.model("Events", EventSchema);

//*-------- exportar el modelo para que lo utilicen los controladores

module.exports = Events;
