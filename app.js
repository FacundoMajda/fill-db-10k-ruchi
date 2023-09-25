//@ts-check
import faker from "faker";

import fs from "fs/promises";
import { writeFile } from "fs/promises";
import {
  DataNombresFemeninos,
  DataNombresMasculinos,
  DataApellidos,
  DataMaterias,
  DataBarrios,
  DataLocalidades,
  DataModalidadesSecundaria,
} from "./data.js";
import { DataEstablecimientosEducativos } from "./establecimientos_educativos.js";

// Cantidad de alumnos a generar
const NUM_ALUMNOS = 10000;

// Rangos de edades para cada nivel
const EDAD_RANGOS = {
  Inicial: { min: 4, max: 6 },
  Primario: { min: 6, max: 12 },
  Secundario: { min: 12, max: 18 },
  Terciario: { min: 18, max: 45 },
};

// Niveles educativos y sus códigos
const NIVELES_EDUCATIVOS = [
  { codigo: 101, nombre: "Inicial" },
  { codigo: 102, nombre: "Primaria" },
  { codigo: 110, nombre: "Secundaria" },
  { codigo: 115, nombre: "Superior" },
];

// Gracias Dante por la inspiración
// Esquema basico, faltan datos
// Creo que funciona medianamente bien, hacer fork cualquier cosa, se aceptan suggestions

//Funcion obtener elemento aleatorio
function obtenerElementoAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Genera un numero Aleatorio, como dice su nombre, no?
function generarNumeroAleatorio(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

//-----------------//
//Generar DNI como id.
// function generarDNIaleatorio(usedDNIs) {
//   let dni;
//   do {
//     dni = Math.floor(100000000 + Math.random() * 900000000);
//   } while (usedDNIs.has(dni));
//   usedDNIs.add(dni);
//   return dni;
// }
//---------------------------------//
const generarFechaNacimiento = () => {
  return faker.date.between("1900-01-01", "2015-12-31");
};

function calcularDNI(fechaNacimiento) {
  if (!fechaNacimiento) {
    throw new Error("Fecha de nacimiento no definida");
  }

  // Definir rangos de DNI según el nivel educativo
  const dniRanges = {
    Primaria: { min: 50000000, max: 55999999 },
    Secundaria: { min: 45000000, max: 49999999 },
    Terciario: { min: 10000000, max: 44999999 },
  };

  // Extraer el año de nacimiento
  const yearOfBirth = parseInt(fechaNacimiento.split("-")[0]);

  // Obtener el nivel educativo basado en el año de nacimiento
  const nivel = obtenerNivelEducativo(yearOfBirth);

  // Obtener el rango de DNI según el nivel educativo
  const dniRange = dniRanges[nivel];

  // Calcular el DNI en función del año de nacimiento
  const dni = dniRange.min + (yearOfBirth - new Date().getFullYear());

  return dni;
}

//---------------------------------//

function obtenerNivelEducativo(yearOfBirth) {
  const edad = new Date().getFullYear() - yearOfBirth;

  if (edad >= 4 && edad <= 6) {
    return "Inicial";
  } else if (edad >= 6 && edad <= 12) {
    return "Primaria";
  } else if (edad >= 12 && edad <= 18) {
    return "Secundaria";
  } else if (edad >= 18 && edad <= 45) {
    return "Terciario";
    // } else {
    //   throw new Error("Edad fuera de rango educativo");
  }
}

//Obtener barrio de los array de arriba, segun localidad
function obtenerBarrioAleatorio(localidadName) {
  return obtenerElementoAleatorio(DataBarrios[localidadName] || []);
}

//Generador de domicilio, la estructura del objeto "domicilio", difiere segun el tipo; "Edificio", "Vivienda", "Casa", respectivamente
function generarDomicilio(localidadName) {
  const domicilio = { calle: `Calle ${generarNumeroAleatorio() * 1000 + 1}` };
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

// Función principal, generación de registro, unión de todas las otras funciones
async function generarAlumno() {
  //-------------------//

  // Definir rangos de DNI según el nivel educativo
  const dniRanges = {
    Primaria: { min: 50000000, max: 55999999 },
    Secundaria: { min: 45000000, max: 49999999 },
    Terciario: { min: 10000000, max: 44999999 },
  };

  //-----------------//

  const nombreMasculino = obtenerElementoAleatorio(DataNombresMasculinos);
  const nombreFemenino = obtenerElementoAleatorio(DataNombresFemeninos);

  const nombre =
    Math.random() < 0.5 ? nombreMasculino.name : nombreFemenino.name;

  const genero = nombre === nombreMasculino.name ? "Masculino" : "Femenino";

  const apellido = obtenerElementoAleatorio(DataApellidos);
  const localidad = obtenerElementoAleatorio(DataLocalidades);

  const fechaNacimiento = generarFechaNacimiento();
  const dni = calcularDNI(fechaNacimiento);

  // Obtener un año aleatorio y sus materias correspondientes
  const año = obtenerElementoAleatorio(DataMaterias);
  const materias = año.materias;
  const cantidadMaterias = materias.length;

  // Asignar notas aleatorias a cada materia
  const notas = {};
  for (let i = 0; i < cantidadMaterias; i++) {
    const materia = materias[i].name;
    notas[materia] = Math.floor(Math.random() * 10) + 1;
  }

  const establecimiento = obtenerElementoAleatorio(
    DataEstablecimientosEducativos
  );

  //Faker dependency//
  const telefono = faker.phone.phoneNumber();
  const email = faker.internet.email();

  const domicilio = generarDomicilio(localidad.name);

  return {
    _id: dni,
    nombres: nombre,
    apellidos: apellido,
    genero: genero,
    contacto: {
      email: email,
      telefono: telefono,
    },

    localidad: localidad,
    domicilio: domicilio,
    fechaNacimiento: fechaNacimiento,
    año: año.año,
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
