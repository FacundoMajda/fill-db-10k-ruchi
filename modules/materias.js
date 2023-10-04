import fs from "fs";
import { obtenerNivelEducativo, generarMateriasYNotas } from "./utils.js";

// Leer el archivo JSON de alumnos
const alumnosData = fs.readFileSync("alumnos.json");
const alumnos = JSON.parse(alumnosData);

// Procesar cada alumno y generar las materias y notas correspondientes
const materias_notas = alumnos.map((alumno) => {
  const nivelEducativo = obtenerNivelEducativo(alumno.edad);

  if (nivelEducativo) {
    const { materias, notas } = generarMateriasYNotas(nivelEducativo);
    return {
      alumnoId: alumno._id,
      nivelEducativo,
      materias,
      notas,
    };
  } else {
    return {
      alumnoId: alumno._id,
      nivelEducativo: "Desconocido",
      materias: [],
      notas: [],
    };
  }
});

// Guardar la lista de alumnos con materias y notas en un archivo JSON
fs.writeFileSync(
  "alumnos_materias_notas.json",
  JSON.stringify(materias_notas, null, 2)
);

console.log("Lista de alumnos con materias y notas generada con éxito.");
