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

//Genera un numero Aleatorio, como dice su nombre, no?
function generarNumeroAleatorio(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function obtenerElementoAleatorio(arr) {
  return arr[generarNumeroAleatorio(0, arr.length - 1)];
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
//Generar fecha nac
function generarFechaNacimiento() {
  const fecha = faker.date.between("1900-01-01", "2015-12-31");
  return fecha.toISOString().split("T")[0];
}
//Edad segun fecha
function generarEdad(fechaNacimiento) {
  const fechaActual = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

  if (
    fechaActual.getMonth() < fechaNac.getMonth() ||
    (fechaActual.getMonth() === fechaNac.getMonth() &&
      fechaActual.getDate() < fechaNac.getDate())
  ) {
    edad--;
  }

  return edad;
}

//---------------------------------//
function obtenerNivelEducativo(edad) {
  let nivel;

  if (edad >= 4 && edad <= 6) {
    nivel = NIVELES_EDUCATIVOS.find((nivel) => nivel.nombre === "Inicial");
  } else if (edad >= 6 && edad <= 12) {
    nivel = NIVELES_EDUCATIVOS.find((nivel) => nivel.nombre === "Primaria");
  } else if (edad >= 12 && edad <= 18) {
    nivel = NIVELES_EDUCATIVOS.find((nivel) => nivel.nombre === "Secundaria");
  } else if (edad >= 18 && edad <= 45) {
    nivel = NIVELES_EDUCATIVOS.find((nivel) => nivel.nombre === "Superior");
  }

  return nivel;
}

// function obtenerNivelEducativo(yearOfBirth) {
//   const edad = new Date().getFullYear() - yearOfBirth;

//   if (edad >= 4 && edad <= 6) {
//     return "Inicial";
//   } else if (edad >= 6 && edad <= 12) {
//     return "Primaria";
//   } else if (edad >= 12 && edad <= 18) {
//     return "Secundaria";
//   } else if (edad >= 18 && edad <= 45) {
//     return "Terciario";
//     // } else {
//     //   throw new Error("Edad fuera de rango educativo");
//   }
// }

function calcularDNI(fechaNacimiento) {
  const yearOfBirth = fechaNacimiento;
  const nivel = obtenerNivelEducativo(yearOfBirth);

  const dniRanges = {
    Primaria: { min: 50000000, max: 55999999 },
    Secundaria: { min: 45000000, max: 49999999 },
    Terciario: { min: 10000000, max: 44999999 },
  };

  const dni = dniRanges[nivel].min + (yearOfBirth - new Date().getFullYear());

  return dni;
}

//---------------------------------//

//Obtener barrio de los array de arriba, segun localidad
function obtenerBarrioAleatorio(localidadName) {
  return obtenerElementoAleatorio(DataBarrios[localidadName] || []);
}

//Generador de domicilio, la estructura del objeto "domicilio", difiere segun el tipo; "Edificio", "Vivienda", "Casa", respectivamente
function generarDomicilio(localidadName) {
  const domicilio = { calle: `Calle ${generarNumeroAleatorio(1000, 9999)}` };

  // Asignar el tipo de domicilio
  if (localidadName === "Formosa Capital") {
    domicilio.tipo = obtenerElementoAleatorio(["Edificio", "Vivienda", "Casa"]);
  } else {
    domicilio.tipo = "Casa";
  }

  switch (domicilio.tipo) {
    case "Edificio":
      domicilio.piso = generarNumeroAleatorio(1, 20);
      domicilio.depto = generarNumeroAleatorio(1, 10);
      domicilio.torre = Math.floor(Math.random() * 100) + 1;
      break;
    case "Vivienda":
      domicilio.manzana = generarNumeroAleatorio(1, 20);
      domicilio.casa = generarNumeroAleatorio(1, 100);
      break;
    case "Casa":
      domicilio.casa = generarNumeroAleatorio(1, 100);
      break;
  }

  // Asignar el barrio
  domicilio.barrio = obtenerBarrioAleatorio(localidadName);

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

  //------//
  const edad = generarEdad(fechaNacimiento);

  //--------//
  const establecimiento = obtenerElementoAleatorio(
    DataEstablecimientosEducativos
  );

  //Faker dependency//
  const telefono = faker.phone.phoneNumber();
  const email = faker.internet.email();

  //Domicilio
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
    edad: edad,
    año: año.año,
    notas: notas,
    establecimiento: {
      nombre: establecimiento.nombre,
      ambito: establecimiento.ambito,
      departamento: establecimiento.departamento,
      localidad: establecimiento.localidad,
      coñd_loca: establecimiento.cod_loca,
      CUEanexo: establecimiento.CUEanexo,
    },
  };
}

//Funcion de guardado con FS
async function guardarAlumnos() {
  const calcularDNI = new Set();
  const alumnos = [];

  for (let i = 0; i < 10000; i++) {
    alumnos.push(generarAlumno(calcularDNI));
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
