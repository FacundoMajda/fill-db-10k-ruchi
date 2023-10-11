//@ts-check
import faker from "faker";
import fs from "fs";
import {
  DataNombresFemeninos,
  DataNombresMasculinos,
  DataApellidos,
  DataLocalidades,
} from "./OLD/data.js";
import {
  obtenerElementoAleatorio,
  generarNumeroAleatorio,
} from "./OLD/utils.js";

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
