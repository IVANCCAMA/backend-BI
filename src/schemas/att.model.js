const { Schema, model } = require("mongoose");

const AttSchema = Schema({
  ID_TARIFA: {
    type: String,
    uppercase: true,
  },
  RAZON_SOCIAL: {
    type: String,
    uppercase: true,
  },
  NOMBRE_COMERCIAL: {
    type: String,
    uppercase: true,
  },
  DEPARTAMENTO: {
    type: String,
    uppercase: true,
  },
  DESCRIPCION: {
    type: String,
    uppercase: true,
  },
  COSTO_INSTALACION: {
    type: String,
    uppercase: true,
  },
  TIPO_PAGO: {
    type: String,
    uppercase: true,
  },
  NOMBRE_TARIFA_PLAN: {
    type: String,
    uppercase: true,
  },
  ANCHO_BANDA_BAJADA: {
    type: String,
    uppercase: true,
  },
  PRECIO_MENSUAL: {
    type: String,
    uppercase: true,
  },
  ANCHO_BANDA_SUBIDA: {
    type: String,
    uppercase: true,
  },
  DENOMINACION_TECNOLOGIA: {
    type: String,
    uppercase: true,
  },

  FECHA_AGREGACION: {
    type: Date,
    uppercase: true,
  },
});

AttSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});
module.exports = model("att", AttSchema);
