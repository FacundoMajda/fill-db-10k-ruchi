import mongoose from "mongoose";

export const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino"],
    required: true,
  },
  localidad: {
    type: String,
    required: true,
  },
  domicilio: {
    calle: String,
    tipo: String,
    piso: String,
    departamento: String,
    manzana: String,
    numero: String,
  },

  nivel: {
    type: String,
    required: true,
  },
  gradoAño: {
    type: String,
    required: true,
  },
  modalidad: {
    type: String,
    required: true,
  },
  notas: {
    type: Map,
    of: Number,
  },
  establecimiento: {
    codigo: Number,
    nombre: String,
  },
});

const Alumno = mongoose.model("Alumno", alumnoSchema);
