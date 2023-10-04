import faker from "faker";
import { DataBarrios, DataMaterias } from "./data.js";
import * as DataEstablecimientos from "./establecimientos_educativos.js";
export const niveles = ["Inicial", "Primaria", "Secundaria", "Terciario"];

// Datos de niveles educativos y sus rangos de DNI correspondientes
export const NIVELES_EDUCATIVOS = {
  Inicial: {
    codigo: 101,
    nivel: "Inicial",
    min: 56000000,
    max: 56999999,
    edadMinima: 4,
    edadMaxima: 6,
  },
  Primaria: {
    codigo: 102,
    nivel: "Primaria",
    min: 55000000,
    max: 55999999,
    edadMinima: 6,
    edadMaxima: 13,
  },
  Secundaria: {
    codigo: 110,
    nivel: "Secundaria",
    min: 45000000,
    max: 49999999,
    edadMinima: 13,
    edadMaxima: 19,
  },
  Terciaria: {
    codigo: 115,
    nivel: "Terciaria",
    min: 10000000,
    max: 44999999,
    edadMinima: 19,
    edadMaxima: 45,
  },
};

// Genera un número aleatorio en un rango
export function generarNumeroAleatorio(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

// Obtiene un elemento aleatorio de un array
export function obtenerElementoAleatorio(arr) {
  return arr[generarNumeroAleatorio(0, arr.length - 1)];
}

// Obtiene el nivel educativo según la edad
export function obtenerNivelEducativo(edad) {
  for (const nivel in NIVELES_EDUCATIVOS) {
    const nivelData = NIVELES_EDUCATIVOS[nivel];
    if (edad >= nivelData.edadMinima && edad <= nivelData.edadMaxima) {
      return nivel;
    }
  }
  throw new Error("No se pudo determinar el nivel educativo.");
}

// Genera una fecha de nacimiento aleatoria según el nivel educativo
export function generarFechaNacimiento(nivel) {
  const nivelData = NIVELES_EDUCATIVOS;
  if (!nivelData) {
    throw new Error(`Nivel educativo '${nivel}' no válido.`);
  }

  // Calcular el año máximo y mínimo permitido según el nivel educativo
  const añoActual = new Date().getFullYear();
  const añoMinimo = añoActual - nivelData.edadMaxima;
  const añoMaximo = añoActual - nivelData.edadMinima;

  // Generar una fecha de nacimiento aleatoria dentro del rango
  try {
    const fecha = faker.date.between(
      `${añoMinimo}-01-01`,
      `${añoMaximo}-12-31`
    );
    return fecha.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error al generar fecha de nacimiento:", error.message);
    throw error;
  }
}
// Calcula el DNI aleatorio según el nivel educativo
export function calcularDNI(nivel) {
  let min, max;

  switch (nivel) {
    case "Inicial":
      min = NIVELES_EDUCATIVOS.Inicial.min;
      max = NIVELES_EDUCATIVOS.Inicial.max;
      break;
    case "Primaria":
      min = NIVELES_EDUCATIVOS.Primaria.min;
      max = NIVELES_EDUCATIVOS.Primaria.max;
      break;
    case "Secundaria":
      min = NIVELES_EDUCATIVOS.Secundaria.min;
      max = NIVELES_EDUCATIVOS.Secundaria.max;
      break;
    case "Terciaria":
      min = NIVELES_EDUCATIVOS.Terciaria.min;
      max = NIVELES_EDUCATIVOS.Terciaria.max;
      break;
    default:
      console.error(`Nivel educativo '${nivel}' no válido.`);
      throw new Error(`Nivel educativo '${nivel}' no válido.`);
  }

  // Generar un número de DNI aleatorio dentro del rango
  const dni = generarNumeroAleatorio(min, max);
  return dni;
}

// Genera la edad según la fecha de nacimiento
export function generarEdad(fechaNacimiento) {
  const fechaActual = new Date();
  const fechaNac = new Date(fechaNacimiento);

  if (fechaNac > fechaActual) {
    console.error("La fecha de nacimiento no puede estar en el futuro.");
    throw new Error("La fecha de nacimiento no puede estar en el futuro.");
  }

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

export function obtenerBarrioAleatorio(localidadName) {
  return obtenerElementoAleatorio(DataBarrios[localidadName] || []);
}

// Generador de domicilio, la estructura del objeto "domicilio", difiere según el tipo; "Edificio", "Vivienda", "Casa", respectivamente
export function generarDomicilio(localidadName) {
  const domicilio = { calle: `Calle ${generarNumeroAleatorio(1000, 9999)}` };

  // Asignar el tipo de domicilio
  if (localidadName === "Formosa Capital") {
    domicilio.tipo = obtenerElementoAleatorio(["Edificio", "Vivienda", "Casa"]);
  } else {
    domicilio.tipo = "Casa";
  }

  switch (domicilio.tipo) {
    case "Edificio":
      domicilio.piso = generarNumeroAleatorio(1, 6);
      domicilio.depto = generarNumeroAleatorio(1, 12);
      domicilio.numero = generarNumeroAleatorio(1, 100);
      break;
    case "Vivienda":
      domicilio.manzana = generarNumeroAleatorio(1, 20);
      domicilio.casa = generarNumeroAleatorio(1, 100);
      break;
    case "Casa":
      domicilio.numero = generarNumeroAleatorio(1, 1000);
      break;
  }

  // Asignar el barrio
  domicilio.barrio = obtenerBarrioAleatorio(localidadName);

  return domicilio;
}

// Función para generar notas aleatorias
export function generarNotaAleatoria(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener las materias de un nivel
export function obtenerMateriasPorNivel(nivel) {
  if (!NIVELES_EDUCATIVOS[nivel]) {
    console.error(`Nivel educativo '${nivel}' no válido.`);
    throw new Error(`Nivel educativo '${nivel}' no válido.`);
  }
  return DataMaterias[nivel] || [];
}

// Función para generar materias y notas aleatorias
export function generarMateriasYNotas(nivelEducativo) {
  try {
    const materiasPorNivel = obtenerMateriasPorNivel(nivelEducativo);
    if (!materiasPorNivel) {
      throw new Error(
        `No se encontraron materias para el nivel educativo '${nivelEducativo}'.`
      );
    }

    const materias = [];
    const notas = [];

    // Generar materias y notas aleatorias para cada materia
    materiasPorNivel.forEach((año) => {
      año.materias.forEach((materia) => {
        materias.push(materia.name);
        // Generar una nota aleatoria entre 1 y 10
        notas.push(generarNotaAleatoria(1, 10));
      });
    });

    return { materias, notas };
  } catch (error) {
    console.error(
      "Ocurrió un error al generar las materias y notas:",
      error.message
    );
    throw error;
  }
}

//----------------------//
export function obtenerEstablecimientoPorNivel(nivel) {
  switch (nivel) {
    case "Inicial":
      return obtenerElementoAleatorio(
        DataEstablecimientos.DataEstablecimientosInicial
      );
    case "Primaria":
      return obtenerElementoAleatorio(
        DataEstablecimientos.DataEstablecimientosPrimaria
      );
    case "Secundaria":
      return obtenerElementoAleatorio(
        DataEstablecimientos.DataEstablecimientosSecundaria
      );
    case "Terciaria":
      return obtenerElementoAleatorio(
        DataEstablecimientos.DataEstablecimientosTerciaria
      );
    default:
      console.error(`Nivel educativo '${nivel}' no válido.`);
      throw new Error(`Nivel educativo '${nivel}' no válido.`);
  }
}
