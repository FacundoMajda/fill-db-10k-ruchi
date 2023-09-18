//@ts-check

import fs from "fs/promises";
import { writeFile } from "fs/promises";
import {
  nombresFemeninosOriginales,
  nombresMasculinosOriginales,
  DataApellidos,
  DataMaterias,
  DataBarrios,
  DataLocalidades,
  DataModalidadesSecundaria,
  DataEstablecimientosEducativos,
} from "./data.js";

//Cantidad y probabilidad
const NUM_ALUMNOS = 10000;
const PROBABILIDAD_GENERO_MASCULINO = 0.5;
//MinMaxPrimaria
const EDAD_MINIMA_PRIMARIA = 6;
const EDAD_MAXIMA_PRIMARIA = 12;
//MinMaxSecundaria
const EDAD_MINIMA_SECUNDARIA = 12;
const EDAD_MAXIMA_SECUNDARIA = 18;
//MinMaxTerciario
const EDAD_MINIMA_TERCIARIO = 18;
const EDAD_MAXIMA_TERCIARIO = 45;
// //NumMaterias
// const NUM_MATERIAS_PRIMARIA = 8;
// const NUM_MATERIAS_SECUNDARIA = 12;
// const NUM_MATERIAS_TERCIARIO = 10;

// Gracias Dante por la inspiración
// Esquema basico, faltan datos
// Creo que funciona medianamente bien, hacer fork cualquier cosa, se aceptan suggestions

// Relaciones nombre genero
const DataNombresFemeninos = nombresFemeninosOriginales.map((nombre) => ({
  name: nombre,
  gender: "Femenino",
}));
const DataNombresMasculinos = nombresMasculinosOriginales.map((nombre) => ({
  name: nombre,
  gender: "Masculino",
}));

//Funcion obtener elemento aleatorio
function obtenerElementoAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Generar DNI como id.
function generarDNIaleatorio(usedDNIs) {
  let dni;
  do {
    dni = Math.floor(100000000 + Math.random() * 900000000);
  } while (usedDNIs.has(dni));
  usedDNIs.add(dni);
  return dni;
}

//Generador de edad y franjas etarias
function generarEdadAleatoria(nivel) {
  let edadMinima, edadMaxima;

  if (nivel === "Primario") {
    edadMinima = EDAD_MINIMA_PRIMARIA;
    edadMaxima = EDAD_MAXIMA_PRIMARIA;
  } else if (nivel === "Secundario") {
    edadMinima = EDAD_MINIMA_SECUNDARIA;
    edadMaxima = EDAD_MAXIMA_SECUNDARIA;
  } else {
    edadMinima = EDAD_MINIMA_TERCIARIO;
    edadMaxima = EDAD_MAXIMA_TERCIARIO;
  }

  return Math.floor(edadMinima + Math.random() * (edadMaxima - edadMinima + 1));
}

//Obtener barrio de los array de arriba, segun localidad
function obtenerBarrioAleatorio(localidadName) {
  const barrios = DataBarrios[localidadName] || [];
  return barrios.length > 0
    ? obtenerElementoAleatorio(barrios).name
    : localidadName;
}

//Generador de domicilio, la estructura del objeto "domicilio", difiere segun el tipo; "Edificio", "Vivienda", "Casa", respectivamente
function generarDomicilio(localidadName) {
  const domicilio = { calle: `Calle ${Math.floor(Math.random() * 100) + 1}` };
  if (localidadName === "Formosa Capital") {
    const tiposDomicilio = ["Edificio", "Vivienda", "Casa"];
    const tipo = obtenerElementoAleatorio(tiposDomicilio);

    if (tipo === "Edificio") {
      domicilio.tipo = "Edificio";
      domicilio.piso = Math.floor(Math.random() * 20) + 1;
      domicilio.depto = Math.floor(Math.random() * 10) + 1;
    } else if (tipo === "Vivienda") {
      domicilio.tipo = "Vivienda";
      domicilio.manzana = Math.floor(Math.random() * 20) + 1;
      domicilio.casa = Math.floor(Math.random() * 100) + 1;
    } else {
      domicilio.tipo = "Casa";
      domicilio.casa = Math.floor(Math.random() * 100) + 1;
    }
    domicilio.barrio = obtenerBarrioAleatorio(localidadName);
  } else {
    domicilio.tipo = "Casa";
    domicilio.casa = Math.floor(Math.random() * 100) + 1;
    domicilio.barrio = obtenerBarrioAleatorio(localidadName);
  }
  return domicilio;
}

//funcion principal, generacion de registro, union de todas las otras funciones
function generarAlumno(usedDNIs) {
  const nombreMasculino = obtenerElementoAleatorio(DataNombresMasculinos);
  const nombreFemenino = obtenerElementoAleatorio(DataNombresFemeninos);

  const nombre =
    Math.random() < 0.5 ? nombreMasculino.name : nombreFemenino.name;

  const genero = nombre === nombreMasculino.name ? "Masculino" : "Femenino";

  const apellido = obtenerElementoAleatorio(DataApellidos);
  const localidad = obtenerElementoAleatorio(DataLocalidades);
  const dni = generarDNIaleatorio(usedDNIs);
  const edad = generarEdadAleatoria();

  const nivel =
    Math.random() < 0.3
      ? "Terciario"
      : Math.random() < 0.5
      ? "Primaria"
      : "Secundaria";

  const grado = Math.floor(Math.random() * (nivel === "Primaria" ? 6 : 7)) + 1;
  const gradoAño = nivel === "Primaria" ? "Grado" : "Año";
  const modalidad =
    nivel === "Secundaria" &&
    grado > 3 &&
    obtenerElementoAleatorio(DataModalidadesSecundaria);

  const cantidadMaterias =
    nivel === "Primaria" ? 8 : nivel === "Secundaria" ? 12 : 8;

  const notas = {};
  for (let j = 1; j <= cantidadMaterias; j++) {
    notas[`Materia${j}`] = Math.floor(Math.random() * 10) + 1;
  }

  const establecimiento = {
    codigo: nivel === "Primaria" ? 102 : nivel === "Secundaria" ? 103 : 115,
    nombre: `Escuela ${dni}`,
  };

  const domicilio = generarDomicilio(localidad.name);

  return {
    _id: dni,
    nombres: nombre,
    apellidos: apellido,
    genero: genero,
    localidad: localidad,
    domicilio: domicilio,
    edad: edad,
    nivel: nivel,
    [gradoAño]: grado,
    modalidad: modalidad,
    notas: notas,
    establecimiento: establecimiento,
  };
}

//Funcion de guardado con FS
async function guardarAlumnos() {
  const usedDNIs = new Set();
  const alumnos = [];

  for (let i = 0; i < 10000; i++) {
    alumnos.push(generarAlumno(usedDNIs));
  }

  try {
    await fs.writeFile("alumnos.json", JSON.stringify(alumnos, null, 2));
    console.log(
      "Los documentos JSON de los alumnos se han generado y guardado exitosamente en el archivo 'alumnos.json'."
    );
  } catch (error) {
    console.error("Ocurrió un error al guardar los alumnos:", error.message);
  }
}

//Starter
guardarAlumnos();
