//@ts-check
import faker from "faker";
import fs from "fs";
import {
  DataNombresFemeninos,
  DataNombresMasculinos,
  DataApellidos,
  DataLocalidades,
} from "./modules/data.js";
import {
  obtenerElementoAleatorio,
  generarFechaNacimiento,
  calcularDNI,
  generarEdad,
  generarDomicilio,
  // niveles,
  // NIVELES_EDUCATIVOS,
  obtenerEstablecimientoPorNivel,
  obtenerNivelEducativo,
} from "./modules/utils.js";
import * as DataEstablecimientos from "./modules/establecimientos_educativos.js";

// Función principal, generación de registro, unión de todas las otras funciones
function generarAlumno() {
  const nombreMasculino = obtenerElementoAleatorio(DataNombresMasculinos);
  const nombreFemenino = obtenerElementoAleatorio(DataNombresFemeninos);
  const nombre =
    Math.random() < 0.5 ? nombreMasculino.name : nombreFemenino.name;
  const genero = nombre === nombreMasculino.name ? "Masculino" : "Femenino";
  const apellido = obtenerElementoAleatorio(DataApellidos);
  // Generar la fecha de nacimiento y edad antes de obtener el nivel
  const fechaNacimiento = generarFechaNacimiento();
  const edad = generarEdad(fechaNacimiento);

  // Obtener el nivel educativo basado en la edad
  const nivel = obtenerNivelEducativo(edad);

  // Luego, puedes calcular el DNI y otros datos
  const dni = calcularDNI(nivel);
  const localidad = obtenerElementoAleatorio(DataLocalidades);
  const establecimiento = obtenerEstablecimientoPorNivel(nivel);

  // Faker dependency
  const telefono = faker.phone.phoneNumber();
  const email = faker.internet.email();

  // Domicilio
  const domicilio = generarDomicilio(localidad);

  return {
    _id: dni,
    nombre: nombre,
    apellido: apellido,
    genero: genero,
    contacto: {
      email: email,
      telefono: telefono,
    },
    localidad: localidad,
    domicilio: domicilio,
    fechaNacimiento: fechaNacimiento,
    edad: edad,
    nivelEducativo: nivel,
    notas: {},
    establecimiento: {
      nombre: establecimiento.nombre,
      ambito: establecimiento.ambito,
      departamento: establecimiento.departamento,
      localidad: establecimiento.localidad,
      cod_loca: establecimiento.cod_loca,
      CUEanexo: establecimiento.CUEanexo,
    },
  };
}

// Función de guardado con FS
function guardarAlumnos() {
  const alumnos = [];

  for (let i = 0; i < 10000; i++) {
    alumnos.push(generarAlumno());
  }

  try {
    fs.writeFileSync("alumnos.json", JSON.stringify(alumnos, null, 2));
    console.log(
      "Los documentos JSON de los alumnos se han generado y guardado exitosamente en el archivo 'alumnos.json'."
    );
  } catch (error) {
    console.error("Ocurrió un error al guardar los alumnos:", error.message);
  }
}

// Starter
guardarAlumnos();
